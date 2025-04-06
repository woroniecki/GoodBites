using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Core.App.Commands.AddHabit;
using Modules.Core.App.Queries.GetHabitsList;

namespace Modules.Core.API.Controllers;

[ApiController]
[Route($"api/{ApiName.Name}/[controller]")]
public class HabitController(IMediator mediator)
    : ControllerBase
{
    [HttpPost]
    [Route("add-habit")]
    public async Task<IActionResult> AddHabit([FromBody] AddHabitCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }

    [HttpGet]
    [Route("get-habits")]
    public async Task<ActionResult<IEnumerable<GetHabitsListQueryResponse>>> GetHabitsList()
    {
        return Ok(await mediator.Send(new GetHabitsListQuery()));
    }
}