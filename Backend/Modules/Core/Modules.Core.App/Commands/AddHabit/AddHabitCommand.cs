using MediatR;

namespace Modules.Core.App.Commands.AddHabit;
// Include properties to be used as input for the command
public record AddHabitCommand(string Name, bool Positive, string Description) : IRequest<Unit>;