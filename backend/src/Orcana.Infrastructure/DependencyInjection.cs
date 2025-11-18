using Orcana.Application.Assistant;
using Orcana.Application.Assistant.Tools.CreateMovement;
using Orcana.Domain.AggregatesModel.MovementAggregate;
using Orcana.Domain.SeedWork;
using Orcana.Infrastructure.Interceptors;
using Orcana.Infrastructure.LLM;
using Orcana.Infrastructure.Repositories;
using Orcana.Infrastructure.Seeders;

namespace Orcana.Infrastructure;

public static class DependencyInjection
{
    public static IHostApplicationBuilder AddInfrastructureServices(this IHostApplicationBuilder builder)
    {
        builder.Services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();

        builder.Services.AddDbContext<OrcanaContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
            options.UseNpgsql(builder.Configuration.GetConnectionString("OrcanaDb"));
        });

        builder.EnrichNpgsqlDbContext<OrcanaContext>();

        builder.Services.AddScoped<IUnitOfWork>(sp => sp.GetRequiredService<OrcanaContext>());

        builder.Services.AddScoped<OrcanaContextInitializer>();

        builder.Services.AddScoped<IDataSeeder, MovementDataSeeder>();

        builder.Services.AddScoped<IMovementRepository, MovementRepository>();

        builder.Services.AddScoped<CreateMovementTool>();

        builder.Services.AddScoped<IAnaClient, AnaClient>();

        return builder;
    }
}
