using Orcana.Application.Models;
using Orcana.Application.Queries.GetMovementsSummary;
using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Infrastructure.Data.Queries;

public class GetMovementsSummaryQueryService(OrcanaContext context) : IGetMovementsSummaryQueryService
{
    public async Task<MovementsSummaryDto> GetSummaryAsync(
        GetMovementsSummaryQuery query,
        CancellationToken cancellationToken = default)
    {
        var queryable = context.Movements.AsNoTracking();

        if (query.MinOccurredAt is not null)
            queryable = queryable.Where(m => m.OccurredAt >= query.MinOccurredAt.Value);

        if (query.MaxOccurredAt is not null)
            queryable = queryable.Where(m => m.OccurredAt <= query.MaxOccurredAt.Value);

        var totalsByKind = await queryable
            .GroupBy(m => m.Kind)
            .Select(g => new
            {
                Kind = g.Key,
                TotalAmount = g.Sum(m => m.Amount)
            })
            .ToListAsync(cancellationToken);

        var totalIncome = totalsByKind
            .FirstOrDefault(x => x.Kind == MovementKind.Income)?.TotalAmount ?? 0m;

        var totalExpense = totalsByKind
            .FirstOrDefault(x => x.Kind == MovementKind.Expense)?.TotalAmount ?? 0m;

        var balance = totalIncome - totalExpense;

        return new MovementsSummaryDto()
        {
            Totals = new MovementsSummaryTotalsDto()
            {
                TotalIncome = totalIncome,
                TotalExpense = totalExpense,
                Balance = balance
            }
        };
    }
}
