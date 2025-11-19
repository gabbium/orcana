namespace Orcana.Api.Extensions.Cors;

public static class CorsExtensions
{
    private const string SpaCorsPolicy = "SpaCorsPolicy";

    public static IHostApplicationBuilder AddSpaCors(this IHostApplicationBuilder builder)
    {
        builder.Services.AddCors(options =>
        {
            options.AddPolicy(SpaCorsPolicy, policy =>
            {
                policy
                    .SetIsOriginAllowed(_ => true)
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return builder;
    }

    public static WebApplication UseSpaCors(this WebApplication app)
    {
        app.UseCors(SpaCorsPolicy);

        return app;
    }
}
