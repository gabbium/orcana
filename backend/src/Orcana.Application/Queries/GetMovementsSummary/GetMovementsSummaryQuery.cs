using Orcana.Application.Models;

namespace Orcana.Application.Queries.GetMovementsSummary;

public record GetMovementsSummaryQuery : IQuery<Result<MovementsSummaryDto>>
{
    public DateTimeOffset? MinOccurredAt { get; init; }
    public DateTimeOffset? MaxOccurredAt { get; init; }
}
