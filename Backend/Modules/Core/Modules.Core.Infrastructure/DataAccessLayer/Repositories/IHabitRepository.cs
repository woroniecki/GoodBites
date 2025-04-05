using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.Infrastructure.DataAccessLayer.Repositories;
public interface IHabitRepository
{
    Task<List<Habit>> GetListAsync(Guid userId, CancellationToken ct);

    Task AddAsync(Habit habit, CancellationToken ct);
}
