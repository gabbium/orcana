using Orcana.Api.Infrastructure;
using Orcana.Api.Models;
using Orcana.Application.Commands.CreateMovement;
using Orcana.Application.Models;
using Orcana.Application.Queries.GetMovementsSummary;
using Orcana.Application.Queries.ListMovements;

namespace Orcana.Api.Controllers;

[ApiVersion("1.0")]
public class MovementsController(IMediator mediator) : BaseController
{
    /// <summary>
    /// List movements
    /// </summary>
    /// <remarks>
    /// Get all movements filtered by date range with optional ordering.
    /// </remarks>
    [HttpGet]
    [ProducesResponseType(typeof(PaginatedList<MovementDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ListMovements(
        [FromQuery] ListMovementsRequest request,
        CancellationToken cancellationToken)
    {
        var query = new ListMovementsQuery
        {
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            Order = request.Order,
            Kind = request.Kind?.ToList(),
            MinOccurredAt = request.MinOccurredAt,
            MaxOccurredAt = request.MaxOccurredAt,
        };

        var result = await mediator.Send(query, cancellationToken);

        return result.ToActionResult(this);
    }

    /// <summary>
    /// Get movements summary
    /// </summary>
    /// <remarks>
    /// Return aggregated totals (income, expense, balance) filtered by date range.
    /// </remarks>
    [HttpGet("summary")]
    [ProducesResponseType(typeof(MovementsSummaryDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetMovementsSummary(
        [FromQuery] GetMovementsSummaryRequest request,
        CancellationToken cancellationToken)
    {
        var query = new GetMovementsSummaryQuery
        {
            MinOccurredAt = request.MinOccurredAt,
            MaxOccurredAt = request.MaxOccurredAt,
        };

        var result = await mediator.Send(query, cancellationToken);

        return result.ToActionResult(this);
    }

    /// <summary>
    /// Create movement
    /// </summary>
    /// <remarks>
    /// Record a new expense or income.
    /// </remarks>
    [HttpPost]
    [ProducesResponseType(typeof(MovementDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateMovement(
        [FromBody] CreateMovementRequest request,
        CancellationToken cancellationToken)
    {
        var command = new CreateMovementCommand
        {
            Kind = request.Kind,
            Amount = request.Amount,
            Description = request.Description,
            OccurredAt = request.OccurredAt,
        };

        var result = await mediator.Send(command, cancellationToken);

        return result.ToActionResult(this);
    }
}

