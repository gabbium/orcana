namespace Orcana.Application.Models;

public record MovementsSummaryDto
{
    [Description("Aggregated totals for all movements within the specified context.")]
    public MovementsSummaryTotalsDto Totals { get; init; } = new();
}
