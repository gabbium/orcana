using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Infrastructure.Data;

public class OrcanaContextInitializer(
    ILogger<OrcanaContextInitializer> logger,
    OrcanaContext context)
{
    public async Task InitializeAsync()
    {
        try
        {
            await context.Database.MigrateAsync();
            await SeedAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing the database");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        if (!context.Movements.Any())
        {
            var movements = new List<Movement>
            {
                new(Guid.Empty, MovementDirection.Income, 132.56m, "Initial income", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 45.00m, "Grocery shopping", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 250.00m, "Freelance project", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 19.90m, "Snacks", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 280.00m, "Electricity bill", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 950.00m, "Salary bonus", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 120.49m, "Fuel", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 59.90m, "Streaming services", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 320.00m, "Sale of old monitor", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 89.00m, "Gym membership", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 75.00m, "Cashback rewards", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 22.50m, "Lunch at cafeteria", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 340.00m, "Internet annual fee", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 150.00m, "Gift received", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 12.90m, "Bus ticket", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 470.00m, "Car maintenance", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 210.00m, "Dividend payout", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 34.99m, "Game purchase", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Income, 680.00m, "Consulting session", DateTimeOffset.UtcNow),
                new(Guid.Empty, MovementDirection.Expense, 15.00m, "Coffee shop", DateTimeOffset.UtcNow)
            };

            await context.Movements.AddRangeAsync(movements);

            await context.SaveChangesAsync();
        }
    }
}

public static class InitializerExtensions
{
    public static async Task InitializeDatabaseAsync(this IHost host)
    {
        using var scope = host.Services.CreateScope();
        var initialiser = scope.ServiceProvider.GetRequiredService<OrcanaContextInitializer>();
        await initialiser.InitializeAsync();
    }
}
