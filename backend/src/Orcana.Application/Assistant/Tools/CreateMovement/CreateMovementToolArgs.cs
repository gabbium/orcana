using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Application.Assistant.Tools.CreateMovement;

public sealed record CreateMovementToolArgs
{
    [Description("Direction of the movement.")]
    public MovementDirection Direction { get; init; }

    [Description("Monetary value of the movement.")]
    public decimal Amount { get; init; }

    [Description("Optional description for the movement (e.g., 'Lunch', 'Salary').")]
    public string? Description { get; init; }

    [Description("Date and time when the movement occurred.")]
    public DateTimeOffset OccurredAt { get; init; }
}
