using MediatR;
using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.App.Commands.AddDailyHabitData;
// Include properties to be used as input for the command
public record AddDailyHabitDataCommand(Guid habitId, DateOnly Date) : IRequest<Habit>;