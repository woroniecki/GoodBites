using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Core.API.Dtos;
using Modules.Core.API.Dtos.Mappers;
using Modules.Core.App.Commands.AddDailyHabitData;
using Modules.Core.App.Commands.RemoveDailyHabitData;
using Modules.Core.App.Queries.GetHabitsData;

namespace Modules.Core.API.Controllers;

[ApiController]
[Route($"api/{ApiName.Name}/[controller]")]
public class HabitDataController(IMediator mediator)
    : ControllerBase
{
    [HttpPost]
    [Route("add-habit-data")]
    public async Task<ActionResult<HabitDto>> AddHabitData([FromBody] AddDailyHabitDataCommand cmd)
    {
        return Ok((await mediator.Send(cmd)).Map());
    }

    [HttpPost]
    [Route("clear-habit-data")]
    public async Task<ActionResult<HabitDto>> ClearHabitData([FromBody] RemoveDailyHabitDataCommand cmd)
    {
        return Ok((await mediator.Send(cmd)).Map());
    }

    [HttpGet]
    [Route("get-habits-data")]
    public async Task<ActionResult<IEnumerable<HabitDto>>> GetHabitsList([FromQuery] DateOnly dateFrom, [FromQuery] DateOnly dateTo)
    {
        return Ok(
            (await mediator.Send(new GetHabitsDataQuery(dateFrom, dateTo))).Select(x => x.Map())
            );
    }
}