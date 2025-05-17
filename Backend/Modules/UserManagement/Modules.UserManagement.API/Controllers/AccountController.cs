using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Modules.UserManagement.App.Commands.GoogleSignIn;
using Modules.UserManagement.App.Commands.Login;
using Modules.UserManagement.App.Commands.RefreshLogin;
using Modules.UserManagement.App.Commands.Register;

namespace Modules.UserManagement.API.Controllers;

[Route($"api/{ApiName.Name}/[controller]")]
[ApiController]
public class AccountController(IMediator mediator, ILogger<AccountController> logger)
    : ControllerBase
{
    private const string REFRESH_TOKEN_KEY = "refresh_token";

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegisterCommand cmd)
    {
        return Ok(await mediator.Send(cmd));
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginCommand cmd)
    {
        var response = await mediator.Send(cmd);

        AddRefreshTokenCookie(response.RefreshToken);

        return Ok(response.AccessToken);
    }

    [HttpPost]
    [Route("google-sign-in")]
    public async Task<ActionResult<string>> GoogleSignIn([FromBody] GoogleSignInCommand cmd)
    {
        var response = await mediator.Send(cmd);

        AddRefreshTokenCookie(response.RefreshToken);

        return Ok(response.AccessToken);
    }

    [HttpPost]
    [Route("refresh-login")]
    public async Task<ActionResult<string>> RefreshLogin()
    {
        if (!Request.Cookies.TryGetValue(REFRESH_TOKEN_KEY, out var refreshToken))
            return Unauthorized("Missing token");

        var command = new RefreshLoginCommand(refreshToken);
        var response = await mediator.Send(command);

        AddRefreshTokenCookie(response.NewRefreshToken);

        return Ok(response.AccessToken);
    }

    [HttpPost]
    [Route("logout")]
    public async Task<ActionResult> Logout()
    {
        if (!Request.Cookies.TryGetValue(REFRESH_TOKEN_KEY, out var refreshToken))
            return Unauthorized("Missing token");

        var command = new RefreshLoginCommand(refreshToken);
        var response = await mediator.Send(command);

        Response.Cookies.Delete(REFRESH_TOKEN_KEY);

        return Ok();
    }

    private void AddRefreshTokenCookie(string refreshToken)
    {
        // Determine if the application is running locally
        var isLocal = HttpContext.Request.Host.Host == "localhost";

        // Store the new refresh token in an HTTP-Only Secure Cookie
        Response.Cookies.Append(REFRESH_TOKEN_KEY, refreshToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = !isLocal,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(7)
        });
    }
}
