using MediatR;

namespace Modules.Core.App.Commands.DeactivateHabit;
internal sealed class DeactivateHabitCommandHandler : IRequestHandler<DeactivateHabitCommand, DeactivateHabitCommandResponse>
{
    public Task<DeactivateHabitCommandResponse> Handle(DeactivateHabitCommand request, CancellationToken cancellationToken)
    {
        // Implement your logic here
        throw new NotImplementedException();
    }
}