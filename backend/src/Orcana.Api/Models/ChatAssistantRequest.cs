namespace Orcana.Api.Models;

public sealed record ChatAssistantRequest
{
    public string Content { get; init; } = string.Empty;
}
