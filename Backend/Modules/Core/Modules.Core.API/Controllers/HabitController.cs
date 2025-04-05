using MediatR;
using Microsoft.AspNetCore.Authorization;
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
    [AllowAnonymous]
    public async Task<IActionResult> AddHabit([FromBody] AddHabitCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }

    [HttpGet]
    [Route("get-habits")]
    [AllowAnonymous]
    public async Task<IActionResult> GetHabitsList()
    {
        return Ok(await mediator.Send(new GetHabitsListQuery()));
    }
}