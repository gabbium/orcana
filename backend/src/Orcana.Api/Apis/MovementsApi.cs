using Orcana.Api.Infrastructure;
using Orcana.Api.Models;
using Orcana.Application.Commands.CreateMovement;
using Orcana.Application.Models;
using Orcana.Application.Queries.GetMovementsSummary;
using Orcana.Application.Queries.ListMovements;

namespace Orcana.Api.Apis;

public static class MovementsApi
{
    public static RouteGroupBuilder MapMovementsApiV1(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("movements")
            .WithTags("Movements")
            .HasApiVersion(1, 0);

        api.MapGet(string.Empty, ListMovements)
            .WithName(nameof(ListMovements))
            .WithSummary("List movements")
            .WithDescription("Get all movements filtered by date range with optional ordering.")
            .Produces<PaginatedList<MovementDto>>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);

        api.MapGet("summary", GetMovementsSummary)
            .WithName(nameof(GetMovementsSummary))
            .WithSummary("Get movements summary")
            .WithDescription("Return aggregated totals (income, expense, balance) filtered by date range.")
            .Produces<MovementsSummaryDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);

        api.MapPost(string.Empty, CreateMovement)
            .WithName(nameof(CreateMovement))
            .WithSummary("Create movement")
            .WithDescription("Record a new expense or income.")
            .Produces<MovementDto>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);

        return api;
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

        var result = await mediator.Send(query, cancellationToken);

        return result.ToMinimalApiResult();
    }

    public static async Task<IResult> GetMovementsSummary(
        [AsParameters] GetMovementsSummaryRequest request,
        IMediator mediator,
        CancellationToken cancellationToken)
    {
        var query = new GetMovementsSummaryQuery
        {
            MinOccurredAt = request.MinOccurredAt,
            MaxOccurredAt = request.MaxOccurredAt
        };

        var result = await mediator.Send(query, cancellationToken);

        return result.ToMinimalApiResult();
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

        var result = await mediator.Send(command, cancellationToken);

        return result.ToMinimalApiResult();
    }
}
