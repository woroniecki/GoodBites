using MediatR;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Queries.GetHabitsList;
internal sealed class GetHabitsListQueryHandler : IRequestHandler<GetHabitsListQuery, IEnumerable<GetHabitsListQueryResponse>>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public GetHabitsListQueryHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<IEnumerable<GetHabitsListQueryResponse>> Handle(GetHabitsListQuery request, CancellationToken cancellationToken)
    {
        return
            (await _unitOfWork.Habits.GetListAsync(_userService.UserId, cancellationToken))
            .Select(x => new GetHabitsListQueryResponse(
                x.Positive, x.Name, x.Active, x.Description, x.CreatedAt
                ));
    }
}
