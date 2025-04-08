namespace Modules.Core.App.Queries.GetHabitsData;

public record GetHabitsDataQueryResponse(
    Guid id,
    bool positive,
    string name,
    bool active,
    string description,
    string icon,
    IEnumerable<DailyHabitsDataDto> dailyDatas)
{ }

public record DailyHabitsDataDto(
    DateOnly date,
    int count)
{ }
