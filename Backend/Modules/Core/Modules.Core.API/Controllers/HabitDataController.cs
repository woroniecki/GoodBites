using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Modules.Core.App.Commands.AddDailyHabitData;
using Modules.Core.App.Commands.AddHabit;
using Modules.Core.App.Queries.GetHabitsData;

namespace Modules.Core.API.Controllers;

[ApiController]
[Route($"api/{ApiName.Name}/[controller]")]
public class HabitDataController(IMediator mediator)
    : ControllerBase
{
    [HttpPost]
    [Route("add-habit-data")]
    public async Task<IActionResult> AddHabitData([FromBody] AddDailyHabitDataCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }

    [HttpPost]
    [Route("clear-habit-data")]
    [AllowAnonymous]
    public async Task<IActionResult> ClearHabitData([FromBody] AddHabitCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }

    [HttpGet]
    [Route("get-habits-data")]
    public async Task<ActionResult<IEnumerable<GetHabitsDataQueryResponse>>> GetHabitsList([FromQuery] DateOnly date)
    {
        return Ok(await mediator.Send(new GetHabitsDataQuery(date)));
    }
}