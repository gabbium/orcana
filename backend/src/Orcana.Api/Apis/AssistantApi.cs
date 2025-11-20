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

        v1.MapPost("chat", Chat)
            .WithName(nameof(Chat))
            .WithSummary("Chat")
            .WithDescription("Process a user message and return Ana’s reply.")
            .Produces<ChatAssistantResponse>(StatusCodes.Status200OK)
            .ProducesValidationProblem(StatusCodes.Status400BadRequest);
    }

    public static async Task<IResult> Chat(
        ChatAssistantRequest request,
        IAnaClient anaClient,
        CancellationToken cancellationToken)
    {
        var reply = await anaClient.SendMessageAsync(
            request.Content,
            cancellationToken);

        return Results.Ok(new ChatAssistantResponse()
        {
            Content = reply
        });
    }
}
