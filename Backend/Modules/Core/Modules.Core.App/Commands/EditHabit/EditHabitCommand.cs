using MediatR;

namespace Modules.Core.App.Commands.EditHabit;
// Include properties to be used as input for the command
public record EditHabitCommand() : IRequest<EditHabitCommandResponse>;