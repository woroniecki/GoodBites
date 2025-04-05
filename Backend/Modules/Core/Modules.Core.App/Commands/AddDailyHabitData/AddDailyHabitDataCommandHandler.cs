using MediatR;
using Modules.Core.Domain.Aggregates.Habit;
using Modules.Core.Infrastructure.DataAccessLayer.UoT;

namespace Modules.Core.App.Commands.AddDailyHabitData;
internal sealed class AddDailyHabitDataCommandHandler : IRequestHandler<AddDailyHabitDataCommand, Unit>
{
    private IUnitOfWork _unitOfWork;

    public AddDailyHabitDataCommandHandler(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Unit> Handle(AddDailyHabitDataCommand request, CancellationToken cancellationToken)
    {
        var newHabit = new Habit(
            Guid.NewGuid(), request.Positive, request.Name, request.Description
            );

        await _unitOfWork.Habits.AddAsync(newHabit, cancellationToken);
        await _unitOfWork.SaveAsync(cancellationToken);

        return Unit.Value;
    }
}