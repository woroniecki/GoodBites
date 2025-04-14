using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Queries.GetHabit;
internal sealed class GetHabitQueryHandler : IRequestHandler<GetHabitQuery, Habit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public GetHabitQueryHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Habit> Handle(GetHabitQuery request, CancellationToken ct)
    {
        return await _unitOfWork.DbContext.Habits
            .Where(x => x.UserId == _userService.UserId && x.Active && x.Id == request.Id)
            .FirstOrDefaultAsync();
    }
}
