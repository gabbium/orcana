using Orcana.Infrastructure.Seeders;

namespace Orcana.Infrastructure;

public class OrcanaContextInitializer(
    ILogger<OrcanaContextInitializer> logger,
    OrcanaContext context,
    IEnumerable<IDataSeeder> seeders)
{
    public async Task InitializeAsync()
    {
        try
        {
            await context.Database.MigrateAsync();

            foreach (var seeder in seeders)
            {
                await seeder.SeedAsync(context);
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An error occurred while initializing the database");
            throw;
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
