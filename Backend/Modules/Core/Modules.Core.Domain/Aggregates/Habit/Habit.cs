using Modules.Core.Domain.Aggregates.Habit.Entities;
using SharedUtils.Domain.Aggregates;

namespace Modules.Core.Domain.Aggregates.Habit;
public class Habit : AggregateRoot
{
    public Guid UserId { get; private set; }
    public bool Positive { get; private set; }
    public string Name { get; private set; }
    public bool Active { get; private set; }
    public string Description { get; private set; }

    public List<DailyHabitData> DailyHabitDatas { get; private set; } = new List<DailyHabitData>();

    public Habit(Guid userId, bool positive, string name, string description)
    {
        UserId = userId;
        Positive = positive;
        Name = name;
        Active = true;
        Description = description;
    }

    public void Update(string name, bool positive, string description)
    {
        Name = name;
        Positive = positive;
        Description = description;
    }

    public void Deactivate()
    {
        Active = false;
    }
}
