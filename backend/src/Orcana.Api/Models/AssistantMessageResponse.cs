namespace Orcana.Api.Models;

public sealed record AssistantMessageResponse
{
    public string Reply { get; init; } = string.Empty;
}
