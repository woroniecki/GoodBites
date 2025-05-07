using Microsoft.Extensions.Caching.Memory;
using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.App.Services.StreakService;
public class StreakCacheService : IStreakCacheService
{
    private readonly IMemoryCache _cache;

    public StreakCacheService(IMemoryCache cache)
    {
        _cache = cache;
    }

    public int? GetStreak(Guid habitId)
    {
        string cacheKey = GetCacheKey(habitId);
        if (_cache.TryGetValue(cacheKey, out int streak))
        {
            return streak;
        }

        return null;
    }

    public int SetAndCalculateStreak(Habit habit)
    {
        string cacheKey = GetCacheKey(habit.Id);
        int streak = CalculateStreak(habit);
        _cache.Set(cacheKey, streak, TimeSpan.FromHours(6));
        return streak;

    }

    private int CalculateStreak(Habit habit)
    {
        var today = DateOnly.FromDateTime(DateTime.Today);

        var sortedDailyHabitsByDate = habit.DailyHabitDatas
            .Where(x => x.Date <= today)
            .OrderByDescending(x => x.Date)
            .Select(x => x.Date)
            .ToList();

        if (!habit.Positive)
        {
            if (!sortedDailyHabitsByDate.Any())
            {
                return -1;
            }

            return today.DayNumber - sortedDailyHabitsByDate.First().DayNumber;
        }
        else
        {
            if (!sortedDailyHabitsByDate.Any())
            {
                return 0;
            }

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

                return strikeCount;
            }

            return 0;
        }
    }

    private string GetCacheKey(Guid habitId)
    {
        return $"habit-streak-{habitId}";
    }
}
