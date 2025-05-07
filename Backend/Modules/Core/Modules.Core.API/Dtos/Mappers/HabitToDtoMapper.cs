using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.API.Dtos.Mappers;
internal static class HabitToDtoMapper
{
    internal static HabitDto Map(this Habit habit, int? streak)
    {
        return new HabitDto
            (
                habit.Id,
                habit.Positive,
                habit.Name,
                habit.Active,
                habit.Icon,
                streak ?? -1,
                habit.DailyHabitDatas
                    .Select(d => new DailyHabitsDataDto
                    (
                        d.Date,
                        d.Count
                    ))
                    .ToList(),
                habit.Colour
            );
    }
}
