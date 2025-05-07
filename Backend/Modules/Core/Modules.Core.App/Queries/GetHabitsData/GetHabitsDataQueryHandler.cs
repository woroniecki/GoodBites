using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.App.Services.StreakService;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Queries.GetHabitsData;
internal sealed class GetHabitsDataQueryHandler : IRequestHandler<GetHabitsDataQuery, IEnumerable<(Habit habit, int? streak)>>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;
    private IStreakCacheService _streakCacheService;

    public GetHabitsDataQueryHandler(IUnitOfWork unitOfWork, ICurrentUserService userService, IStreakCacheService streakCacheService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
        _streakCacheService = streakCacheService;
    }

    public async Task<IEnumerable<(Habit habit, int? streak)>> Handle(GetHabitsDataQuery request, CancellationToken ct)
    {
        var habits = await _unitOfWork.DbContext.Habits
            .Where(x => x.UserId == _userService.UserId && x.Active)
            .OrderBy(x => x.Order)
            .Include(x => x.DailyHabitDatas.Where(d => request.DateFrom <= d.Date && d.Date <= request.DateTo))
            .ToListAsync(ct);

        var results = new List<(Habit habit, int? streak)>();

        List<Habit>? habitsWithAllDailyHabitsData = null;

        foreach (var habit in habits)
        {
            var streak = _streakCacheService.GetStreak(habit.Id);

            if (streak == null)
            {
                if (habitsWithAllDailyHabitsData == null)
                {
                    habitsWithAllDailyHabitsData = await _unitOfWork.DbContext.Habits
                        .Where(x => x.UserId == _userService.UserId && x.Active)
                        .Include(x => x.DailyHabitDatas)
                        .ToListAsync(ct);
                }

                var fullHabit = habitsWithAllDailyHabitsData.First(z => z.Id == habit.Id);
                streak = _streakCacheService.SetAndCalculateStreak(fullHabit);
            }

            results.Add((habit, streak));
        }

        return results;
    }
}
