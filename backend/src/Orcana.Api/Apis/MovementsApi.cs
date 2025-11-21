using Orcana.Api.Models;
using Orcana.Application.Commands.CreateMovement;
using Orcana.Application.Models;
using Orcana.Application.Queries.ListMovements;

namespace Orcana.Api.Apis;

public sealed class MovementsApi : IMinimalApi
{
    public void Map(IEndpointRouteBuilder app)
    {
        var v1 = app.MapGroup("movements")
            .WithTags("Movements")
            .HasApiVersion(1, 0);

        v1.MapGet(string.Empty, ListMovements)
            .WithName(nameof(ListMovements))
            .WithSummary("List movements")
            .WithDescription("Get all movements filtered by date range with optional ordering.")
            .Produces<PaginatedList<MovementDto>>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);

        v1.MapPost(string.Empty, CreateMovement)
            .WithName(nameof(CreateMovement))
            .WithSummary("Create movement")
            .WithDescription("Record a new expense or income.")
            .Produces<MovementDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);
    }

    public static async Task<IResult> ListMovements(
        [AsParameters] ListMovementsRequest request,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var query = new ListMovementsQuery()
        {
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            Order = request.Order,
            Direction = request.Direction?.ToList(),
            MinOccurredAt = request.MinOccurredAt,
            MaxOccurredAt = request.MaxOccurredAt,
        };

        var result = await mediator.SendAsync(query, cancellationToken);

        return result.ToMinimalApiResult(
            () => Results.Ok(result.Value));
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
