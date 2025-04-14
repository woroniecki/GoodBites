namespace Modules.Core.API.Dtos;

public record DailyHabitsDataDto(
    DateOnly date,
    int count
    );
