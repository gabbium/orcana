using Orcana.Api.Extensions.ApiVersioning;
using Orcana.Api.Extensions.OpenApi;
using Orcana.Api.Extensions.ProblemDetail;

namespace Orcana.Api;

public static class DependencyInjection
{
    public static IHostApplicationBuilder AddApiServices(this IHostApplicationBuilder builder)
    {
        builder.AddApiVersioningAndExplorer();

        builder.AddOpenApiWithTransformers(["v1"]);

        builder.Services.AddExceptionHandler<DefaultExceptionHandler>();

        builder.Services.AddProblemDetails();

        builder.Services.ConfigureHttpJsonOptions(options =>
        {
            options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
        });

        builder.Services.AddHttpContextAccessor();

        builder.Services.AddMinimalApisFromAssembly(Assembly.GetExecutingAssembly());

        return builder;
    }

    public static WebApplication UseApi(this WebApplication app)
    {
        app.UseExceptionHandler();

        app.MapGroup("/api/v{version:apiVersion}")
            .WithApiVersionSet(app.NewApiVersionSet().ReportApiVersions().Build())
            .MapMinimalApis();

        app.MapOpenApiAndScalar();

        return app;
    }
}

