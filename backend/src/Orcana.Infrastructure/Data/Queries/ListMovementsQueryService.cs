using Orcana.Application.Models;
using Orcana.Application.Queries.ListMovements;

namespace Orcana.Infrastructure.Data.Queries;

public class ListMovementsQueryService(OrcanaContext context) : IListMovementsQueryService
{
    public async Task<PaginatedList<MovementDto>> ListAsync(
        ListMovementsQuery query,
        CancellationToken cancellationToken = default)
    {
        var queryable = context.Movements.AsNoTracking();

        if (query.Direction is { Count: > 0 })
            queryable = queryable.Where(m => query.Direction.Contains(m.Direction));

        if (query.MinOccurredAt is not null)
            queryable = queryable.Where(m => m.OccurredAt >= query.MinOccurredAt.Value);

        if (query.MaxOccurredAt is not null)
            queryable = queryable.Where(m => m.OccurredAt <= query.MaxOccurredAt.Value);

        var normalizedOrder = query.Order?.Trim().ToLowerInvariant();

        queryable = normalizedOrder switch
        {
            "occurredat desc" => queryable
                .OrderByDescending(m => m.OccurredAt)
                .ThenBy(m => m.Id),
            "occurredat asc" => queryable
                .OrderBy(m => m.OccurredAt)
                .ThenBy(m => m.Id),
            "amount desc" => queryable
                .OrderByDescending(m => m.Amount)
                .ThenBy(m => m.Id),
            "amount asc" => queryable
                .OrderBy(m => m.Amount)
                .ThenBy(m => m.Id),
            _ => queryable
                .OrderByDescending(m => m.OccurredAt)
                .ThenBy(m => m.Id),
        };

        var totalItems = await queryable.CountAsync(cancellationToken);

        var items = await queryable
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(m => new MovementDto()
            {
                Id = m.Id,
                Direction = m.Direction,
                Amount = m.Amount,
                Description = m.Description,
                OccurredAt = m.OccurredAt
            })
            .ToListAsync(cancellationToken);

        return new PaginatedList<MovementDto>(items, totalItems, query.PageNumber, query.PageSize);
    }
}
