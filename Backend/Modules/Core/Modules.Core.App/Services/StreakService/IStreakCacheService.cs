using Modules.Core.Domain.Aggregates.Habit;

namespace Modules.Core.App.Services.StreakService;
interface IStreakCacheService
{
    int? GetStreak(Guid habitId);
    int SetAndCalculateStreak(Habit habit);
}
