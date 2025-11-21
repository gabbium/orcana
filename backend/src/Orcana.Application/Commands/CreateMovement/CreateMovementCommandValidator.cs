namespace Orcana.Application.Commands.CreateMovement;

public class CreateMovementCommandValidator
    : AbstractValidator<CreateMovementCommand>
{
    public CreateMovementCommandValidator()
    {
        RuleFor(c => c.Amount)
            .GreaterThan(0)
            .PrecisionScale(18, 2, true);

        RuleFor(c => c.Description)
            .MaximumLength(128);
    }
}
