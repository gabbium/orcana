namespace Orcana.Application.Models;

public record MovementsSummaryDto
{
    [Description("Aggregated totals for all movements within the specified context.")]
    public MovementsSummaryTotalsDto Totals { get; init; } = new();
}

public record MovementsSummaryTotalsDto
{
    [Description("Sum of all income movements.")]
    public decimal TotalIncome { get; init; }

    [Description("Sum of all expense movements.")]
    public decimal TotalExpense { get; init; }

    [Description("Net balance calculated as TotalIncome minus TotalExpense.")]
    public decimal Balance { get; init; }
}
