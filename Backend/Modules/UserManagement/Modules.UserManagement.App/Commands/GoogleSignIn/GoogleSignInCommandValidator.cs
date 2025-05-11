using FluentValidation;

namespace Modules.UserManagement.App.Commands.GoogleSignIn;
public class GoogleSignInCommandValidator : AbstractValidator<GoogleSignInCommand>
{
    public GoogleSignInCommandValidator()
    {
        // Add validation rules here
    }
}
