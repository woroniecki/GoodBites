using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Modules.UserManagement.App.Services.RefreshToken;
using Modules.UserManagement.Domain.Aggregates.Account;
using Modules.UserManagement.Infrastructure.DataAccessLayer.UoT;
using SharedUtils.Jwt;
using SharedUtils.Time;

namespace Modules.UserManagement.App.Commands.GoogleSignIn;
public sealed class GoogleSignInCommandHandler(
    IHttpClientFactory _httpClientFactory,
    IConfiguration _configuration,
    IUnitOfWork _uot,
    IClock _clock,
    IJwtService _jwtService,
    IRefreshTokenService _tokenService) : IRequestHandler<GoogleSignInCommand, GoogleSignInCommandResponse>
{

    public async Task<GoogleSignInCommandResponse> Handle(GoogleSignInCommand request, CancellationToken cancellationToken)
    {
        var clientId = _configuration["Authentication:Google:ClientId"];
        var clientSecret = _configuration["Authentication:Google:ClientSecret"];
        var redirectUri = _configuration["Authentication:Google:RedirectUri"];

        var httpClient = _httpClientFactory.CreateClient();
        var parameters = new List<KeyValuePair<string, string>>() {
                new("client_id", clientId),
                new("client_secret", clientSecret),
                new("grant_type", "authorization_code"),
                new("code", request.Code),
                new("scope", "openid profile email"),
                new("redirect_uri", redirectUri),
                new("code_verifier", request.CodeVerifier)
            };

        var content = new FormUrlEncodedContent(parameters);
        var response = await httpClient.PostAsync("https://oauth2.googleapis.com/token", content);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Error while exchanging code for token: {error}");
        }

        var json = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(json);
        var root = doc.RootElement;

        var handler = new JwtSecurityTokenHandler();
        var jwtToken = root.GetProperty("id_token").GetString();
        var jwt = handler.ReadJwtToken(jwtToken);

        var googleId = jwt.Claims.First(c => c.Type == JwtRegisteredClaimNames.Sub).Value;
        var fullName = jwt.Claims.First(c => c.Type == "name").Value;
        var email = jwt.Claims.First(c => c.Type == JwtRegisteredClaimNames.Email).Value;

        //Generate APP tokens and login/create account
        var account = await _uot.DbContext.Accounts.Include(a => a.RefreshTokens).AsTracking()
            .FirstOrDefaultAsync(a => a.Email == email);

        // Accounts from external services doesn't have passowrd
        if (account == null)
        {
            account = new Account(
                fullName,
                email,
                ""
                );
            await _uot.Accounts.AddAsync(account);
        }

        var newRefreshToken = _tokenService.GenerateToken();

        account.AddRefreshToken(
                _tokenService.HashToken(newRefreshToken),
                _clock.Now.AddDays(7),
                "device-info",
                "ip-address");

        await _uot.SaveAsync();

        return new GoogleSignInCommandResponse(
            _jwtService.GenerateJwtToken(account.Id, account.Username, account.Email),
            newRefreshToken
        );
    }
}