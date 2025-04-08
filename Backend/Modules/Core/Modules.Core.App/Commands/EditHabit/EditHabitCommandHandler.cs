using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt.CurrentUser;

namespace Modules.Core.App.Commands.EditHabit;
internal sealed class EditHabitCommandHandler : IRequestHandler<EditHabitCommand, Unit>
{
    private IUnitOfWork _unitOfWork;
    private ICurrentUserService _userService;

    public EditHabitCommandHandler(IUnitOfWork unitOfWork, ICurrentUserService userService)
    {
        _unitOfWork = unitOfWork;
        _userService = userService;
    }

    public async Task<Unit> Handle(EditHabitCommand request, CancellationToken ct)
    {
        var habit = await _unitOfWork.DbContext.Habits
            .Where(x => x.Id == request.Id && x.UserId == _userService.UserId).ToListAsync(ct);

        habit.First().Update(
            request.Name,
            request.Positive,
            request.Description
        );

        await _unitOfWork.SaveAsync(ct);

        return Unit.Value;
    }
}