using Orcana.Application.Models;

namespace Orcana.Application.Queries.ListMovements;

internal sealed class ListMovementsQueryHandler(
    IListMovementsQueryService listMovementsQueryService)
    : IQueryHandler<ListMovementsQuery, Result<PaginatedList<MovementDto>>>
{
    public async Task<Result<PaginatedList<MovementDto>>> HandleAsync(
        ListMovementsQuery query,
        CancellationToken cancellationToken = default)
    {
        return await listMovementsQueryService.ListAsync(query, cancellationToken);
    }
}
