using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.App.Services.StreakService;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.EditHabit;
internal sealed class EditHabitCommandHandler : IRequestHandler<EditHabitCommand, Unit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;
    private IStreakCacheService _streakCacheService;

    public EditHabitCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService, IStreakCacheService streakCacheService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
        _streakCacheService = streakCacheService;
    }

    public async Task<Unit> Handle(EditHabitCommand request, CancellationToken ct)
    {
        var habit = await _unitOfWork.DbContext.Habits
            .Include(x => x.DailyHabitDatas)
            .Where(x => x.Id == request.Id && x.UserId == _userService.UserId).FirstAsync();

        bool isPositiveDifferent = habit.Positive != request.Positive;

        habit.Update(
            request.Name,
            request.Positive,
            request.Icon,
            request.colour
        );

        await _unitOfWork.SaveAsync(ct);

        if (isPositiveDifferent)
        {
            _streakCacheService.SetAndCalculateStreak(habit);
        }

        return Unit.Value;
    }
}