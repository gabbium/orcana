namespace Orcana.Api.Models;

public sealed record ChatAssistantResponse
{
    public string Content { get; init; } = string.Empty;
}
