using Orcana.Application.Queries.GetMovementsSummary;
using Orcana.Application.Queries.ListMovements;
using Orcana.Domain.AggregatesModel.MovementAggregate;
using Orcana.Domain.SeedWork;
using Orcana.Infrastructure.Data;
using Orcana.Infrastructure.Data.Queries;
using Orcana.Infrastructure.Data.Repositories;

namespace Orcana.Infrastructure;

public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("OrcanaDb");

        Guard.Against.Null(connectionString);

        services.AddDbContext<OrcanaContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        services.AddScoped<OrcanaContextInitializer>();

        services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<OrcanaContext>());

        services.AddScoped<IListMovementsQueryService, ListMovementsQueryService>();
        services.AddScoped<IGetMovementsSummaryQueryService, GetMovementsSummaryQueryService>();
        services.AddScoped<IMovementRepository, MovementRepository>();

        return services;
    }
}
