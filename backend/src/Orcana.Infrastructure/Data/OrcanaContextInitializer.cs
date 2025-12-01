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
                new(Guid.Empty, MovementKind.Income, 3100.00m, "Salário mensal", new DateTimeOffset(2025, 10, 5, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 228.40m, "Supermercado", new DateTimeOffset(2025, 10, 6, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 59.99m, "Combustível", new DateTimeOffset(2025, 10, 8, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 150.00m, "Venda de livros usados", new DateTimeOffset(2025, 10, 9, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 44.90m, "Assinatura de streaming", new DateTimeOffset(2025, 10, 10, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 275.00m, "Fatura de energia", new DateTimeOffset(2025, 10, 11, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 380.00m, "Freelance — manutenção de site", new DateTimeOffset(2025, 10, 13, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 17.00m, "Café rápido", new DateTimeOffset(2025, 10, 14, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 89.00m, "Academia", new DateTimeOffset(2025, 10, 15, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 14.25m, "Transporte público", new DateTimeOffset(2025, 10, 17, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 210.00m, "Aula de reforço", new DateTimeOffset(2025, 10, 18, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 27.00m, "Almoço no trabalho", new DateTimeOffset(2025, 10, 20, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 90.00m, "Cashback acumulado", new DateTimeOffset(2025, 10, 21, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 335.00m, "Internet + TV", new DateTimeOffset(2025, 10, 22, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 31.90m, "Compra de jogo", new DateTimeOffset(2025, 10, 24, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 15.50m, "Café especial", new DateTimeOffset(2025, 10, 25, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 3200.00m, "Salário mensal", new DateTimeOffset(2025, 11, 5, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 245.79m, "Supermercado", new DateTimeOffset(2025, 11, 6, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 62.50m, "Combustível", new DateTimeOffset(2025, 11, 8, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 180.00m, "Venda de itens usados", new DateTimeOffset(2025, 11, 9, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 39.90m, "Assinatura de streaming", new DateTimeOffset(2025, 11, 10, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 310.00m, "Fatura de energia", new DateTimeOffset(2025, 11, 11, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 28.50m, "Almoço no trabalho", new DateTimeOffset(2025, 11, 12, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 450.00m, "Freelance — landing page", new DateTimeOffset(2025, 11, 13, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 18.00m, "Café e pão de queijo", new DateTimeOffset(2025, 11, 14, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 90.00m, "Academia", new DateTimeOffset(2025, 11, 15, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 120.00m, "Reembolso de transporte", new DateTimeOffset(2025, 11, 16, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 14.25m, "Transporte público", new DateTimeOffset(2025, 11, 17, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 480.00m, "Manutenção do carro", new DateTimeOffset(2025, 11, 18, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 95.00m, "Cashback acumulado", new DateTimeOffset(2025, 11, 19, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 230.00m, "Aula particular", new DateTimeOffset(2025, 11, 20, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 57.90m, "Farmácia", new DateTimeOffset(2025, 11, 21, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 340.00m, "Internet + TV", new DateTimeOffset(2025, 11, 22, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 200.00m, "Consultoria rápida", new DateTimeOffset(2025, 11, 23, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 33.00m, "Compra de jogo em promoção", new DateTimeOffset(2025, 11, 24, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 16.50m, "Café especial", new DateTimeOffset(2025, 11, 25, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 3200.00m, "Salário mensal", new DateTimeOffset(2025, 12, 5, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 255.20m, "Supermercado", new DateTimeOffset(2025, 12, 6, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 70.00m, "Combustível", new DateTimeOffset(2025, 12, 8, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 200.00m, "Venda de mesa digitalizadora", new DateTimeOffset(2025, 12, 9, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 39.90m, "Assinatura de streaming", new DateTimeOffset(2025, 12, 10, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 295.00m, "Fatura de energia", new DateTimeOffset(2025, 12, 11, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 480.00m, "Freelance — API de integrações", new DateTimeOffset(2025, 12, 13, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 26.00m, "Almoço no trabalho", new DateTimeOffset(2025, 12, 14, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 110.00m, "Presentes de Natal", new DateTimeOffset(2025, 12, 15, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 18.50m, "Café da manhã", new DateTimeOffset(2025, 12, 16, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 14.25m, "Transporte público", new DateTimeOffset(2025, 12, 17, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 250.00m, "Aula de programação", new DateTimeOffset(2025, 12, 18, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 29.90m, "Panetone", new DateTimeOffset(2025, 12, 19, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 360.00m, "Internet + TV", new DateTimeOffset(2025, 12, 22, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 170.00m, "Cashback especial de final de ano", new DateTimeOffset(2025, 12, 23, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 42.00m, "Cinema", new DateTimeOffset(2025, 12, 26, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 19.00m, "Café e biscoito", new DateTimeOffset(2025, 12, 27, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 520.00m, "Compra de roupa", new DateTimeOffset(2025, 12, 28, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Income, 300.00m, "Consultoria rápida", new DateTimeOffset(2025, 12, 29, 0, 0, 0, TimeSpan.Zero)),
                new(Guid.Empty, MovementKind.Expense, 87.50m, "Farmácia", new DateTimeOffset(2025, 12, 30, 0, 0, 0, TimeSpan.Zero)),
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
