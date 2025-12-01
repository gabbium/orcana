namespace Orcana.Application.Models;

public record MovementsSummaryTotalsDto
{
    [Description("Sum of all income movements.")]
    public decimal TotalIncome { get; init; }

    [Description("Sum of all expense movements.")]
    public decimal TotalExpense { get; init; }

    [Description("Net balance calculated as TotalIncome minus TotalExpense.")]
    public decimal Balance { get; init; }
}
