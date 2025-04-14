using MediatR;
using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.App.Queries.GetHabitsData;
// Include properties to be used as input for the query
public record GetHabitsDataQuery(DateOnly DateFrom, DateOnly DateTo) : IRequest<IEnumerable<Habit>>;
