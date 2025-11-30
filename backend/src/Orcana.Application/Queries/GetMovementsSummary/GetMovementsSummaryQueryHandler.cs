using Orcana.Application.Models;

namespace Orcana.Application.Queries.GetMovementsSummary;

public class GetMovementsSummaryQueryHandler(
    IGetMovementsSummaryQueryService getMovementsSummaryQueryService)
    : IQueryHandler<GetMovementsSummaryQuery, Result<MovementsSummaryDto>>
{
    public async ValueTask<Result<MovementsSummaryDto>> Handle(
        GetMovementsSummaryQuery query,
        CancellationToken cancellationToken)
    {
        return await getMovementsSummaryQueryService.GetSummaryAsync(query, cancellationToken);
    }
}
