using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Infrastructure.Seeders;

public class MovementDataSeeder : IDataSeeder
{
    public async Task SeedAsync(OrcanaContext context)
    {
        if (!context.Movements.Any())
        {
            var movements = new List<Movement>
            {
                new(Guid.Empty, MovementKind.Income, 132.56m, "Initial income", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementKind.Expense, 45.00m, "Grocery shopping", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementKind.Income, 250.00m, "Freelance project", DateTimeOffset.UtcNow),
            };

            await context.Movements.AddRangeAsync(movements);

            await context.SaveChangesAsync();
        }
    }
}

