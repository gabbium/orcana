namespace Orcana.Api.Models;

public sealed record AssistantMessageRequest
{
    public string Message { get; init; } = string.Empty;
}
