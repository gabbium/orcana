using Orcana.Application.Models;

namespace Orcana.Application.Queries.ListMovements;

public class ListMovementsQueryHandler(
    IListMovementsQueryService listMovementsQueryService)
    : IQueryHandler<ListMovementsQuery, Result<PaginatedList<MovementDto>>>
{
    public async ValueTask<Result<PaginatedList<MovementDto>>> Handle(
        ListMovementsQuery query,
        CancellationToken cancellationToken)
    {
        return await listMovementsQueryService.ListAsync(query, cancellationToken);
    }
}
