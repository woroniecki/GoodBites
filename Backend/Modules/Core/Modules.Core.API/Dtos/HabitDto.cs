namespace Modules.Core.API.Dtos;

public record HabitDto(
    Guid id,
    bool positive,
    string name,
    bool active,
    string description,
    string icon,
    DateOnly? lastCheckedDate,
    int streak,
    IEnumerable<DailyHabitsDataDto> dailyDatas
    );
