namespace Orcana.Api.Infrastructure.OpenApi;

public class OpenApiVersioningDocumentTransformer(
    IApiVersionDescriptionProvider apiVersionDescriptionProvider)
    : IOpenApiDocumentTransformer
{
    public Task TransformAsync(
        OpenApiDocument document,
        OpenApiDocumentTransformerContext context,
        CancellationToken cancellationToken)
    {
        var apiDescription = apiVersionDescriptionProvider.ApiVersionDescriptions
            .SingleOrDefault(description => description.GroupName == context.DocumentName);

        if (apiDescription is null)
        {
            return Task.CompletedTask;
        }

        document.Info.Version = apiDescription.ApiVersion.ToString();
        document.Info.Title = "Orcana HTTP API";
        document.Info.Description = "Orcana HTTP API";

        return Task.CompletedTask;
    }
}



