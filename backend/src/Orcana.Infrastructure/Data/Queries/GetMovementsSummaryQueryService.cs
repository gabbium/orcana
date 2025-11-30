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

        var totalsByDirection = await queryable
            .GroupBy(m => m.Direction)
            .Select(g => new
            {
                Direction = g.Key,
                TotalAmount = g.Sum(m => m.Amount)
            })
            .ToListAsync(cancellationToken);

        var totalIncome = totalsByDirection
            .FirstOrDefault(x => x.Direction == MovementDirection.Income)?.TotalAmount ?? 0m;

        var totalExpense = totalsByDirection
            .FirstOrDefault(x => x.Direction == MovementDirection.Expense)?.TotalAmount ?? 0m;

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
