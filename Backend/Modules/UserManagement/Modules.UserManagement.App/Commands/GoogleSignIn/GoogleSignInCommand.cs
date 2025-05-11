using MediatR;

namespace Modules.UserManagement.App.Commands.GoogleSignIn;
// Include properties to be used as input for the command
public record GoogleSignInCommand(string Code, string CodeVerifier) : IRequest<GoogleSignInCommandResponse>;

public record GoogleSignInCommandResponse(string AccessToken, string RefreshToken);