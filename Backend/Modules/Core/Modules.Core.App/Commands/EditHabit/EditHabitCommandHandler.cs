using MediatR;

namespace Modules.Core.App.Commands.EditHabit;
internal sealed class EditHabitCommandHandler : IRequestHandler<EditHabitCommand, EditHabitCommandResponse>
{
    public Task<EditHabitCommandResponse> Handle(EditHabitCommand request, CancellationToken cancellationToken)
    {
        // Implement your logic here
        throw new NotImplementedException();
    }
}