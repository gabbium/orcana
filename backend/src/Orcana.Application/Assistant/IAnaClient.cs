namespace Orcana.Application.Assistant;

public interface IAnaClient
{
    Task<string> SendMessageAsync(
        string message,
        CancellationToken cancellationToken = default);
}
