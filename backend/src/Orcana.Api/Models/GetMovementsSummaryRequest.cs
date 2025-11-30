namespace Orcana.Api.Models;

public record GetMovementsSummaryRequest
{
    [Description("Filter by minimum occurrence date (inclusive).")]
    public DateTimeOffset? MinOccurredAt { get; init; }

    [Description("Filter by maximum occurrence date (inclusive).")]
    public DateTimeOffset? MaxOccurredAt { get; init; }
}
