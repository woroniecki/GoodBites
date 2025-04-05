using SharedUtils.Domain.Entities;

namespace Modules.Core.Domain.Aggregates.Habit.Entities;
public class DailyHabitData : Entity
{
    public DateTime Date { get; set; }
    public int Count { get; set; }
}
