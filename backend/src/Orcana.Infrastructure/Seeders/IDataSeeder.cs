namespace Orcana.Infrastructure.Seeders;

public interface IDataSeeder
{
    Task SeedAsync(OrcanaContext context);
}

