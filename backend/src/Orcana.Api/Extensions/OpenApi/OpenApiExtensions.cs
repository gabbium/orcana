using Orcana.Api.Extensions.OpenApi.Transformers;

namespace Orcana.Api.Extensions.OpenApi;

public static class OpenApiExtensions
{
    public static IHostApplicationBuilder AddOpenApiWithTransformers(
        this IHostApplicationBuilder builder,
        string[] versions)
    {
        foreach (var documentName in versions)
        {
            builder.Services.AddOpenApi(
                documentName,
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
        }

        return builder;
    }

    public static WebApplication MapOpenApiAndScalar(
        this WebApplication app)
    {
        app.MapOpenApi();

        app.MapScalarApiReference(scalarOptions =>
        {
            scalarOptions.Theme = ScalarTheme.Mars;
            scalarOptions.DefaultFonts = false;
        });

        app.MapGet("/", () => Results.Redirect("/scalar/v1"))
            .ExcludeFromDescription()
            .ExcludeFromApiReference();

        return app;
    }
}



