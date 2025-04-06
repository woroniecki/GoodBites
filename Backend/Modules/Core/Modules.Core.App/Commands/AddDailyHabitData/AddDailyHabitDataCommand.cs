using MediatR;

namespace Modules.Core.App.Commands.AddDailyHabitData;
// Include properties to be used as input for the command
public record AddDailyHabitDataCommand(Guid habitId, string Name, bool Positive, string Description, DateOnly Date) : IRequest<Unit>;