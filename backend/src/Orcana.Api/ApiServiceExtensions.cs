using Orcana.Api.Infrastructure;
using Orcana.Api.Infrastructure.OpenApi;

namespace Orcana.Api;

public static class ApiServiceExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services
            .AddApiVersioning(options =>
            {
                options.DefaultApiVersion = new ApiVersion(1, 0);
                options.AssumeDefaultVersionWhenUnspecified = true;
                options.ReportApiVersions = true;
            })
            .AddApiExplorer(options =>
            {
                options.GroupNameFormat = "'v'VVV";
                options.SubstituteApiVersionInUrl = true;
            });

        services.AddEndpointsApiExplorer();

        services
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(
                    new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
                );
            });

        services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.Converters.Add(
                new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
            );
        });

        services.AddOpenApi(
            "v1",
            options =>
            {
                options.AddDocumentTransformer<OpenApiVersioningDocumentTransformer>();
                options.AddDocumentTransformer((document, context, cancellationToken) =>
                {
                    document.Servers = [];
                    return Task.CompletedTask;
                });
            }
        );

        services.AddExceptionHandler<DefaultExceptionHandler>();

        services.AddProblemDetails();

        services.AddCors(options =>
        {
            options.AddPolicy("SpaCorsPolicy", policy =>
            {
                policy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });

        return services;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
        app.UseExceptionHandler();

        app.MapControllers();

        app.MapOpenApi();

        app.MapScalarApiReference(scalarOptions =>
        {
            scalarOptions.Theme = ScalarTheme.Mars;
            scalarOptions.DefaultFonts = false;
        });

        app.MapGet("/", () => Results.Redirect("/scalar/v1"))
            .ExcludeFromDescription()
            .ExcludeFromApiReference();

        app.UseCors("SpaCorsPolicy");

        return app;
    }
}

