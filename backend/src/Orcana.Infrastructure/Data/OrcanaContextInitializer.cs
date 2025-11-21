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
