using MediatR;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.AddHabit;
internal sealed class AddHabitCommandHandler : IRequestHandler<AddHabitCommand, Unit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public AddHabitCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Unit> Handle(AddHabitCommand request, CancellationToken cancellationToken)
    {
        var newHabit = new Habit(
            _userService.UserId, request.Positive, request.Name, request.Description, request.Icon
        );

        await _unitOfWork.Habits.AddAsync(newHabit, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        return Unit.Value;
    }
}