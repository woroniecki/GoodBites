using Microsoft.EntityFrameworkCore;
using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.Infrastructure.DataAccessLayer.Repositories;
public class HabitRepository : IHabitRepository
{
    private readonly CoreDbContext _context;

    public HabitRepository(CoreDbContext context)
    {
        _context = context;
    }

    public async Task<List<Habit>> GetListAsync(Guid userId, CancellationToken ct)
    {
        return await _context.Habits.Where(x => x.UserId == userId).ToListAsync(ct);
    }

    public async Task AddAsync(Habit habit, CancellationToken ct)
    {
        await _context.Habits.AddAsync(habit, ct);
    }
}
