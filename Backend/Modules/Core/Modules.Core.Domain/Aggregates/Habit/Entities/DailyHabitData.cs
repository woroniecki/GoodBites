using SharedUtils.Domain.Entities;

namespace Modules.Core.Domain.Aggregates.Habit.Entities;
public class DailyHabitData : Entity
{
    public DateOnly Date { get; set; }
    public int Count { get; set; }

    public DailyHabitData(DateOnly date, int count)
    {
        Date = date;
        Count = count;
    }
}
