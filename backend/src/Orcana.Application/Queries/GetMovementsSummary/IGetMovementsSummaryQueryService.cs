using Orcana.Application.Models;

namespace Orcana.Application.Queries.GetMovementsSummary;

public interface IGetMovementsSummaryQueryService
{
    Task<MovementsSummaryDto> GetSummaryAsync(
        GetMovementsSummaryQuery query,
        CancellationToken cancellationToken);
}
