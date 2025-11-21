using Orcana.Application.Models;

namespace Orcana.Application.Queries.ListMovements;

public interface IListMovementsQueryService
{
    Task<PaginatedList<MovementDto>> ListAsync(
        ListMovementsQuery query,
        CancellationToken cancellationToken = default);
}
