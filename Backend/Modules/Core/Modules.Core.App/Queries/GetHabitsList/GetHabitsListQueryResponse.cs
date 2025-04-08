namespace Modules.Core.App.Queries.GetHabitsList;

public record GetHabitsListQueryResponse(
    Guid Id,
    bool Positive,
    string Name,
    bool Active,
    string Description,
    string Icon,
    DateTime createdAt)
{ }
