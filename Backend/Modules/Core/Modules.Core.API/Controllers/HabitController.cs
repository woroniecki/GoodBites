using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Core.App.Commands.AddHabit;
using Modules.Core.App.Commands.DeactivateHabit;
using Modules.Core.App.Commands.EditHabit;
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

    [HttpPost]
    [Route("edit-habit")]
    public async Task<IActionResult> EditHabit([FromBody] EditHabitCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }

    [HttpDelete]
    [Route("remove-habit")]
    public async Task<IActionResult> RemoveHabit([FromBody] DeactivateHabitCommand cmd)
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