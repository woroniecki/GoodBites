using MediatR;

namespace Modules.Core.App.Queries.GetHabitsData;
// Include properties to be used as input for the query
public record GetHabitsDataQuery() : IRequest<GetHabitsDataQueryResponse>;
