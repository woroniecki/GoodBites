using MediatR;
using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.App.Commands.EditHabit;
// Include properties to be used as input for the command
public record EditHabitCommand(Guid Id, string Name, bool Positive, string Description, string Icon, HabitColourEnum colour) : IRequest<Unit>;