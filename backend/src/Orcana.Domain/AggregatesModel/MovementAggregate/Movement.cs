using Orcana.Domain.SeedWork;

namespace Orcana.Domain.AggregatesModel.MovementAggregate;

public class Movement : Entity, IAggregateRoot
{
    public Guid UserId { get; private set; }
    public MovementKind Kind { get; private set; }
    public decimal Amount { get; private set; }
    public string? Description { get; private set; }
    public DateTimeOffset OccurredAt { get; private set; }

    protected Movement()
    {
    }

    public Movement(
        Guid userId,
        MovementKind kind,
        decimal amount,
        string? description,
        DateTimeOffset occurredAt)
    {
        UserId = userId;
        Kind = kind;
        Amount = amount;
        Description = description;
        OccurredAt = occurredAt;
    }
}
