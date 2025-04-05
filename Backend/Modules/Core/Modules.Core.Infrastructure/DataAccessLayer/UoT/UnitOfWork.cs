using Modules.Core.Infrastructure.DataAccessLayer.Repositories;

namespace Modules.Core.Infrastructure.DataAccessLayer.UoT;
internal class UnitOfWork(CoreDbContext _context) : IUnitOfWork
{
    private IHabitRepository _habits;

    public CoreDbContext DbContext => _context;
    public IHabitRepository Habits => _habits ??= new HabitRepository(_context);

    public async Task<int> SaveAsync(CancellationToken ct)
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
