using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Domain.Aggregates.Habit.Entities;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.AddDailyHabitData;
internal sealed class AddDailyHabitDataCommandHandler : IRequestHandler<AddDailyHabitDataCommand, Unit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public AddDailyHabitDataCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Unit> Handle(AddDailyHabitDataCommand request, CancellationToken ct)
    {
        var habit = await _unitOfWork.DbContext.Habits
            .Where(x => x.UserId == _userService.UserId && x.Id == request.habitId)
            .Include(x => x.DailyHabitDatas.Where(d => d.Date == request.Date))
            .FirstOrDefaultAsync(ct);

        if (habit == null)
            throw new Exception("Habit not found");

        if (habit.DailyHabitDatas?.Count > 0)
            throw new Exception("Habit already added");

        var newHabitData = new DailyHabitData(
            request.Date,
            1
        );

        habit.DailyHabitDatas.Add(newHabitData);

        await _unitOfWork.SaveAsync(ct);

        return Unit.Value;
    }
}