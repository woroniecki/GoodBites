using System.Text.Json.Serialization;

namespace Modules.Core.Domain.Aggregates.Habit;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum HabitColourEnum
{
    Green = 0,
    Lime = 1,
    Red = 2,
    Maroon = 3,
    Blue = 4,
    Navy = 5,
    Cyan = 6,
    Teal = 7,
    Pink = 8,
    Purple = 9,
    Orange = 10,
    Brown = 11,
    Yellow = 12,
    Olive = 13,
    Grey = 14,
    Black = 15
}
