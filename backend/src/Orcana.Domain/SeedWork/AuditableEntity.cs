namespace Orcana.Domain.SeedWork;

public abstract class AuditableEntity : Entity
{
    public DateTimeOffset? CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}
