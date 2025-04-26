using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.API.Dtos;

public record HabitDto
{
    public HabitDto(Guid id, bool positive, string name, bool active, string description, string icon, DateOnly? lastCheckedDate, int streak, IEnumerable<DailyHabitsDataDto> dailyDatas, HabitColourEnum colour)
    {
        this.id = id;
        this.positive = positive;
        this.name = name;
        this.active = active;
        this.description = description;
        this.icon = icon;
        this.lastCheckedDate = lastCheckedDate;
        this.streak = streak;
        this.dailyDatas = dailyDatas;
        this.colour = colour;
    }

    public Guid id { get; set; }
    public bool positive { get; set; }
    public string name { get; set; }
    public bool active { get; set; }
    public string description { get; set; }
    public string icon { get; set; }
    public DateOnly? lastCheckedDate { get; set; }
    public int streak { get; set; }
    public IEnumerable<DailyHabitsDataDto> dailyDatas { get; set; }
    public HabitColourEnum colour { get; set; }
}
