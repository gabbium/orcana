using Orcana.Domain.AggregatesModel.MovementAggregate;
using Orcana.Domain.SeedWork;
using Orcana.Infrastructure.Data.EntityConfigurations;

namespace Orcana.Infrastructure.Data;

public class OrcanaContext(DbContextOptions options) : DbContext(options), IUnitOfWork
{
    public DbSet<Movement> Movements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new MovementEntityTypeConfiguration());
    }
}
