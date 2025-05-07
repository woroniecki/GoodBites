using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.App.Services.StreakService;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.AddDailyHabitData;
internal sealed class AddDailyHabitDataCommandHandler : IRequestHandler<AddDailyHabitDataCommand, (Habit habit, int? streak)>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;
    private IStreakCacheService _streakCacheService;

    public AddDailyHabitDataCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService, IStreakCacheService streakCacheService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
        _streakCacheService = streakCacheService;
    }

    public async Task<(Habit habit, int? streak)> Handle(AddDailyHabitDataCommand request, CancellationToken ct)
    {
        var habit = await _unitOfWork.DbContext.Habits
            .Where(x => x.UserId == _userService.UserId && x.Id == request.habitId)
            .Include(x => x.DailyHabitDatas)
            .FirstOrDefaultAsync(ct);

        if (habit == null)
            throw new Exception("Habit not found");

        if (habit.DailyHabitDatas.Any(d => d.Date == request.Date))
            throw new Exception("Habit already added");

        habit.AddDailyHabitData(request.Date, 1);

        await _unitOfWork.SaveAsync(ct);

        var streak = _streakCacheService.SetAndCalculateStreak(habit);

        return (habit, streak);
    }
}