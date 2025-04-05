namespace Modules.Core.App.Queries.GetHabitsList;

public record GetHabitsListQueryResponse(
    bool Positive,
    string Name,
    bool Active,
    string Description,
    DateTime createdAt)
{ }
