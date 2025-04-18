using MediatR;
using Microsoft.AspNetCore.Mvc;
using Modules.Core.API.Dtos;
using Modules.Core.API.Dtos.Mappers;
using Modules.Core.App.Commands.AddHabit;
using Modules.Core.App.Commands.DeactivateHabit;
using Modules.Core.App.Commands.EditHabit;
using Modules.Core.App.Commands.SetOrderHabits;
using Modules.Core.App.Queries.GetHabit;

namespace Modules.Core.API.Controllers;

[ApiController]
[Route($"api/{ApiName.Name}/[controller]")]
public class HabitController(IMediator mediator)
    : ControllerBase
{
    [HttpGet]
    [Route("get-habit")]
    public async Task<ActionResult<HabitDto>> GetHabit([FromQuery] Guid habitId)
    {
        return Ok((await mediator.Send(new GetHabitQuery(habitId))).Map());
    }

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

    [HttpPost]
    [Route("set-habits-order")]
    public async Task<IActionResult> SetHabitsOrder([FromBody] SetOrderHabitsCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }
}