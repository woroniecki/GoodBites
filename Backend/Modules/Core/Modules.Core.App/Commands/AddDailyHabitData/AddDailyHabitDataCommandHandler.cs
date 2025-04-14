using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.AddDailyHabitData;
internal sealed class AddDailyHabitDataCommandHandler : IRequestHandler<AddDailyHabitDataCommand, Habit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public AddDailyHabitDataCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Habit> Handle(AddDailyHabitDataCommand request, CancellationToken ct)
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

        return habit;
    }
}