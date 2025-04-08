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
    public string Icon { get; private set; } = "default.svg";
    public int StrikeCounter { get; private set; } = 0;
    public DateOnly? LastClickedDate { get; private set; } = null;

    public List<DailyHabitData> DailyHabitDatas { get; private set; } = new List<DailyHabitData>();

    public Habit(Guid userId, bool positive, string name, string description, string icon)
    {
        UserId = userId;
        Positive = positive;
        Name = name;
        Active = true;
        Description = description;
        Icon = icon;
    }

    public void AddDailyHabitData(DateOnly date, int count)
    {
        DailyHabitDatas.Add(new DailyHabitData(date, count));
        UpdateLastUsedDailyData();
    }

    public void RemoveDailyHabitData(DateOnly date)
    {
        var dailyHabitData = DailyHabitDatas.FirstOrDefault(x => x.Date == date);
        if (dailyHabitData != null)
        {
            DailyHabitDatas.Remove(dailyHabitData);
        }

        UpdateLastUsedDailyData();
    }

    private void UpdateLastUsedDailyData()
    {
        var sortedDailyHabitsByDate = DailyHabitDatas
            .OrderByDescending(x => x.Date)
            .Select(x => x.Date)
            .ToList();

        if (!sortedDailyHabitsByDate.Any())
        {
            LastClickedDate = null;
            StrikeCounter = 0;
            return;
        }

        LastClickedDate = sortedDailyHabitsByDate.FirstOrDefault();

        var today = DateOnly.FromDateTime(DateTime.Today);
        var firstStrikeDateIndex = 0;

        if (sortedDailyHabitsByDate[firstStrikeDateIndex] == today ||
            sortedDailyHabitsByDate[firstStrikeDateIndex] == today.AddDays(-1))
        {
            var strikeCount = 1;
            var currentDate = sortedDailyHabitsByDate[firstStrikeDateIndex];

            for (int i = 1; i < sortedDailyHabitsByDate.Count; i++)
            {
                var expectedPreviousDate = currentDate.AddDays(-1);
                if (sortedDailyHabitsByDate[i] == expectedPreviousDate)
                {
                    strikeCount++;
                    currentDate = expectedPreviousDate;
                }
                else
                {
                    break;
                }
            }

            StrikeCounter = strikeCount;
        }
        else
        {
            StrikeCounter = 0;
        }
    }

    public void Update(string name, bool positive, string description, string icon)
    {
        Name = name;
        Positive = positive;
        Description = description;
        Icon = icon;
    }

    public void Deactivate()
    {
        Active = false;
    }
}
