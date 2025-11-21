using Orcana.Application.Models;
using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Application.Queries.ListMovements;

public record ListMovementsQuery : IQuery<Result<PaginatedList<MovementDto>>>
{
    public int PageNumber { get; init; }
    public int PageSize { get; init; }
    public string? Order { get; init; }
    public List<MovementDirection>? Direction { get; init; }
    public DateTimeOffset? MinOccurredAt { get; init; }
    public DateTimeOffset? MaxOccurredAt { get; init; }
}
