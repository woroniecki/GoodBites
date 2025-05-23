﻿using MediatR;
using Microsoft.EntityFrameworkCore;
using Modules.UserManagement.App.Services.Password;
using Modules.UserManagement.App.Services.RefreshToken;
using Modules.UserManagement.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt;
using SharedUtils.Time;

namespace Modules.UserManagement.App.Commands.Login;
public sealed class LoginCommandHandler(
    IUnitOfWork _uot,
    IPasswordService _passwordService,
    IJwtService _jwtService,
    IRefreshTokenService _tokenService,
    IClock _clock)
    : IRequestHandler<LoginCommand, LoginCommandResponse>
{
    public async Task<LoginCommandResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var hashedPassword = _passwordService.HashPassword(request.Password);

        var account = await _uot.DbContext.Accounts.Include(a => a.RefreshTokens).AsTracking()
            .FirstOrDefaultAsync(a => a.Username == request.Username);

        // Accounts from external services doesn't have passowrd, so login should be blocked
        if (account != null && hashedPassword == account.Password && !string.IsNullOrEmpty(account.Password))
        {
            var newRefreshToken = _tokenService.GenerateToken();

            account.AddRefreshToken(
                _tokenService.HashToken(newRefreshToken),
                _clock.Now.AddDays(21),
                "device-info",
                "ip-address");

            await _uot.SaveAsync();

            return new LoginCommandResponse(
                    _jwtService.GenerateJwtToken(account.Id, account.Username, account.Email),
                    newRefreshToken
                    );
        }

        throw new Exception("Invalid username or password");
    }
}