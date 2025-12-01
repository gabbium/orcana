using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Application.Models;

public record MovementDto
{
    [Description("Unique identifier of the movement.")]
    public Guid Id { get; init; }

    [Description("Kind of the movement.")]
    public MovementKind Kind { get; init; }

    [Description("Monetary value of the movement.")]
    public decimal Amount { get; init; }

    [Description("Optional description for the movement (e.g., 'Lunch', 'Salary').")]
    public string? Description { get; init; }

    [Description("Date and time when the movement occurred.")]
    public DateTimeOffset OccurredAt { get; init; }
}
