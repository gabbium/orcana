using Orcana.Api.Models;
using Orcana.Application.Commands.CreateMovement;
using Orcana.Application.Models;

namespace Orcana.Api.Apis;

public sealed class MovementsApi : IMinimalApi
{
    public void Map(IEndpointRouteBuilder app)
    {
        var v1 = app.MapGroup("movements")
            .WithTags("Movements")
            .HasApiVersion(1, 0);

        v1.MapPost(string.Empty, CreateMovement)
            .WithName(nameof(CreateMovement))
            .WithSummary("Create movement")
            .WithDescription("Record a new expense or income.")
            .Produces<MovementDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);
    }

    public static async Task<IResult> CreateMovement(
        CreateMovementRequest request,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var command = new CreateMovementCommand()
        {
            Direction = request.Direction,
            Amount = request.Amount,
            Description = request.Description,
            OccurredAt = request.OccurredAt,
        };

        var result = await mediator.SendAsync(command, cancellationToken);

        return result.ToMinimalApiResult(
            () => Results.Ok(result.Value));
    }
}
