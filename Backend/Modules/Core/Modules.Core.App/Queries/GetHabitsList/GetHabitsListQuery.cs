using MediatR;

namespace Modules.Core.App.Queries.GetHabitsList;
// Include properties to be used as input for the query
public record GetHabitsListQuery() : IRequest<IEnumerable<GetHabitsListQueryResponse>>;
