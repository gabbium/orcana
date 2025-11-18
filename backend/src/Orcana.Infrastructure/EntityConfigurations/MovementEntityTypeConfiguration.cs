using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Infrastructure.EntityConfigurations;

internal sealed class MovementEntityTypeConfiguration : IEntityTypeConfiguration<Movement>
{
    public void Configure(EntityTypeBuilder<Movement> builder)
    {
        builder.Property(m => m.Direction)
            .HasConversion<string>()
            .HasMaxLength(30);

        builder.Property(m => m.Amount)
            .HasPrecision(18, 2);

        builder.Property(m => m.Description)
            .HasMaxLength(128);
    }
}
