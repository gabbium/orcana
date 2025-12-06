using Orcana.Domain.SeedWork;

namespace Orcana.Domain.AggregatesModel.CategoryAggregate;

public class Category : Entity, IAggregateRoot
{
    public Guid UserId { get; private set; }
    public CategoryKind Kind { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public bool IsActive { get; private set; } = true;

    protected Category()
    {
    }

    public Category(
        Guid userId, 
        CategoryKind kind, 
        string name)
    {
        UserId = userId;
        Kind = kind;
        Name = name;
    }
}
