using MediatR;

namespace Modules.Core.App.Commands.SetOrderHabits;
// Include properties to be used as input for the command
public record SetOrderHabitsCommand(IEnumerable<Guid> HabitsOrder) : IRequest<Unit>;

