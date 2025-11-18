using Orcana.Api.Models;
using Orcana.Application.Assistant;

namespace Orcana.Api.Apis;

public sealed class AssistantApi : IMinimalApi
{
    public void Map(IEndpointRouteBuilder app)
    {
        var v1 = app.MapGroup("assistant")
            .WithTags("Assistant")
            .HasApiVersion(1, 0);

        v1.MapPost("messages", SendMessage)
            .WithName(nameof(SendMessage))
            .WithSummary("Send message")
            .WithDescription("Process a user message and return Ana’s reply.")
            .Produces<AssistantMessageResponse>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);
    }

    public static async Task<IResult> SendMessage(
        AssistantMessageRequest request,
        IAnaClient assistantClient,
        CancellationToken cancellationToken)
    {
        var reply = await assistantClient.SendMessageAsync(
            request.Message,
            cancellationToken);

        return Results.Ok(new AssistantMessageResponse()
        {
            Reply = reply
        });
    }
}
