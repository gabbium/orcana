using Orcana.ServiceDefaults.HealthCheck;
using Orcana.ServiceDefaults.OpenTelemetry;
using Orcana.ServiceDefaults.SerilogLogging;

namespace Orcana.ServiceDefaults;

public static class Extensions
{
    public static IHostApplicationBuilder AddServiceDefaults(this IHostApplicationBuilder builder)
    {
        builder.AddDefaultSerilog();

        builder.AddDefaultOpenTelemetry();

        builder.AddDefaultHealthChecks();

        builder.Services.AddServiceDiscovery();

        builder.Services.ConfigureHttpClientDefaults(http =>
        {
            http.AddStandardResilienceHandler();
            http.AddServiceDiscovery();
        });

        return builder;
    }

    public static WebApplication MapDefaultEndpoints(this WebApplication app)
    {
        app.MapDefaultSerilog();

        app.MapDefaultHealthChecks();

        return app;
    }
}


