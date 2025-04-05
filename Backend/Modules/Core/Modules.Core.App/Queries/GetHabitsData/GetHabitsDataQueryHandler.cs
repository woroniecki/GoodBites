using MediatR;

namespace Modules.Core.App.Queries.GetHabitsData;
internal sealed class GetHabitsDataQueryHandler : IRequestHandler<GetHabitsDataQuery, GetHabitsDataQueryResponse>
{
    public Task<GetHabitsDataQueryResponse> Handle(GetHabitsDataQuery request, CancellationToken cancellationToken)
    {
        // Implement your logic here
        throw new NotImplementedException();
    }
}
