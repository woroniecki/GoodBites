using MediatR;

namespace Modules.Core.App.Commands.RemoveDailyHabitData;
// Include properties to be used as input for the command
public record RemoveDailyHabitDataCommand(Guid habitId, DateOnly Date) : IRequest<Unit>;