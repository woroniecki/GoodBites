using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.DeactivateHabit;
internal sealed class DeactivateHabitCommandHandler : IRequestHandler<DeactivateHabitCommand, Unit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public DeactivateHabitCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Unit> Handle(DeactivateHabitCommand request, CancellationToken ct)
    {
        var habit = await _unitOfWork.DbContext.Habits
            .Where(x => x.Id == request.Id && x.UserId == _userService.UserId)
            .FirstOrDefaultAsync(ct);

        if (habit == null)
        {
            throw new Exception("Habit not found");
        }

        habit.Deactivate();

        await _unitOfWork.SaveAsync(ct);

        return Unit.Value;
    }
}