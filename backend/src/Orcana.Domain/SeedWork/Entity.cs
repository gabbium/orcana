namespace Orcana.Domain.SeedWork;

public abstract class Entity : HasDomainEventsBase
{
    public Guid Id { get; protected set; }
}
