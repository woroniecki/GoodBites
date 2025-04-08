using MediatR;

namespace Modules.Core.App.Commands.DeactivateHabit;
// Include properties to be used as input for the command
public record DeactivateHabitCommand(Guid Id) : IRequest<Unit>;