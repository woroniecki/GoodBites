using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.SetOrderHabits;
internal sealed class SetOrderHabitsCommandHandler : IRequestHandler<SetOrderHabitsCommand, Unit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public SetOrderHabitsCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Unit> Handle(SetOrderHabitsCommand request, CancellationToken ct)
    {
        var habits = await _unitOfWork.DbContext.Habits
            .Where(x => x.UserId == _userService.UserId).ToListAsync(ct);

        var habitsOrderList = request.HabitsOrder.ToList();

        for (int i = 0; i < habitsOrderList.Count; i++)
        {
            var habit = habits.FirstOrDefault(x => x.Id == habitsOrderList[i]);
            if (habit != null)
            {
                habit.SetOrder(i);
            }
        }

        await _unitOfWork.SaveAsync(ct);

        return Unit.Value;
    }
}