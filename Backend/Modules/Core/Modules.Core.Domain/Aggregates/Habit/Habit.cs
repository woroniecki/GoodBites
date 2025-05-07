using Modules.Core.Domain.Aggregates.Habit.Entities;
using SharedUtils.Domain.Aggregates;

namespace Modules.Core.Domain.Aggregates.Habit;
public class Habit : AggregateRoot
{
    public Guid UserId { get; private set; }
    public bool Positive { get; private set; }
    public string Name { get; private set; }
    public bool Active { get; private set; }
    public string Icon { get; private set; } = "default.svg";
    public int Order { get; private set; }
    public HabitColourEnum Colour { get; private set; } = HabitColourEnum.Green;

    public List<DailyHabitData> DailyHabitDatas { get; private set; } = new List<DailyHabitData>();

    public Habit(Guid userId, bool positive, string name, string icon, int order, HabitColourEnum colour)
    {
        UserId = userId;
        Positive = positive;
        Name = name;
        Active = true;
        Icon = icon;
        Order = order;
        Colour = colour;
    }

    public void AddDailyHabitData(DateOnly date, int count)
    {
        DailyHabitDatas.Add(new DailyHabitData(date, count));
    }

    public void RemoveDailyHabitData(DateOnly date)
    {
        var dailyHabitData = DailyHabitDatas.FirstOrDefault(x => x.Date == date);
        if (dailyHabitData != null)
        {
            DailyHabitDatas.Remove(dailyHabitData);
        }
    }

    public void Update(string name, bool positive, string icon, HabitColourEnum colour)
    {
        Name = name;
        Positive = positive;
        Icon = icon;
        Colour = colour;
    }

    public void SetOrder(int order)
    {
        Order = order;
    }

    public void Deactivate()
    {
        Active = false;
    }
}
