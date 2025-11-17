using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Api.Models;

public sealed record CreateMovementRequest
{
    [Required]
    [Description("Type of the movement.")]
    public MovementKind Kind { get; init; }

    [Required]
    [Range(0.01, double.MaxValue)]
    [Description("Monetary value of the movement.")]
    public decimal Amount { get; init; }

    [MaxLength(128)]
    [Description("Optional description for the movement (e.g., 'Lunch', 'Salary').")]
    public string? Description { get; init; }

    [Required]
    [Description("Date and time when the movement occurred.")]
    public DateTimeOffset OccurredAt { get; init; }
}
