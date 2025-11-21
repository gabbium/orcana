using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Api.Models;

public sealed class ListMovementsRequest
{
    [Required]
    [Range(1, int.MaxValue)]
    [DefaultValue(1)]
    [Description("Page number.")]
    public int PageNumber { get; init; }

    [Required]
    [Range(1, 100)]
    [DefaultValue(20)]
    [Description("Items per page.")]
    public int PageSize { get; init; }

    [Description("Sort order, e.g. 'occurredAt desc' or 'amount asc'.")]
    public string? Order { get; init; }

    [Description("Filter by movement kind.")]
    public MovementDirection[]? Direction { get; init; }

    [Description("Filter by minimum occurrence date (inclusive).")]
    public DateTimeOffset? MinOccurredAt { get; init; }

    [Description("Filter by maximum occurrence date (inclusive).")]
    public DateTimeOffset? MaxOccurredAt { get; init; }
}
