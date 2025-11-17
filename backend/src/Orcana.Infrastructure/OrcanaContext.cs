using Orcana.Domain.AggregatesModel.MovementAggregate;
using Orcana.Domain.SeedWork;
using Orcana.Infrastructure.EntityConfigurations;

namespace Orcana.Infrastructure;

public sealed class OrcanaContext(DbContextOptions options) : DbContext(options), IUnitOfWork
{
    public DbSet<Movement> Movements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new MovementEntityTypeConfiguration());
    }
}
