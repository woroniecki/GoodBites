using MediatR;
using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.App.Queries.GetHabit;
// Include properties to be used as input for the query
public record GetHabitQuery(Guid Id) : IRequest<Habit>;
