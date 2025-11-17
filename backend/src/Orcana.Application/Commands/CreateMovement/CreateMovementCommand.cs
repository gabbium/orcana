using Orcana.Application.Models;
using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Application.Commands.CreateMovement;

public sealed record CreateMovementCommand : ICommand<Result<MovementDto>>
{
    public MovementKind Kind { get; init; }
    public decimal Amount { get; init; }
    public string? Description { get; init; }
    public DateTimeOffset OccurredAt { get; init; }
}
