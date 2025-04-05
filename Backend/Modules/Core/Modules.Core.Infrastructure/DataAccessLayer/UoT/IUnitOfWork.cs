using Modules.Core.Infrastructure.DataAccessLayer.Repositories;

namespace Modules.Core.Infrastructure.DataAccessLayer.UoT;
public interface IUnitOfWork
{
    CoreDbContext DbContext { get; }

    IHabitRepository Habits { get; }

    Task<int> SaveAsync(CancellationToken ct);
}
