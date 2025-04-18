using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Queries.GetHabitsData;
internal sealed class GetHabitsDataQueryHandler : IRequestHandler<GetHabitsDataQuery, IEnumerable<Habit>>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public GetHabitsDataQueryHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<IEnumerable<Habit>> Handle(GetHabitsDataQuery request, CancellationToken ct)
    {
        return (await _unitOfWork.DbContext.Habits
            .Where(x => x.UserId == _userService.UserId && x.Active)
            .OrderBy(x => x.Order)
            .Include(x => x.DailyHabitDatas.Where(d => request.DateFrom <= d.Date && d.Date <= request.DateTo))
            .ToListAsync(ct));
    }
}
