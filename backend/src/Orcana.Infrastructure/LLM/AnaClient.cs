using Orcana.Application.Assistant;
using Orcana.Application.Assistant.Tools.CreateMovement;

namespace Orcana.Infrastructure.LLM;

internal sealed class AnaClient(
    IChatClient chatClient,
    CreateMovementTool createMovementTool) : IAnaClient
{
    public async Task<string> SendMessageAsync(
        string message,
        CancellationToken cancellationToken = default)
    {
        var utcNow = DateTimeOffset.UtcNow;

        var tools = new[]
        {
            AIFunctionFactory.Create(
                createMovementTool.ExecuteAsync,
                CreateMovementTool.Name,
                CreateMovementTool.Description)
        };

        var options = new ChatOptions
        {
            Tools = tools,
            Temperature = 0.1f,
            Instructions = $"""
                Você é Ana, a assistente financeira integrada ao sistema Orcana.

                Seu propósito:
                - Ajudar o usuário somente com tarefas relacionadas ao sistema financeiro Orcana,
                  como registrar movimentações, consultar funcionalidades do sistema ou explicar como registrar dados.
                - Executar ações via ferramentas quando necessário.

                Limitações:
                - NÃO responda perguntas fora desse escopo (ex.: curiosidades, clima, piadas, vida pessoal etc.).
                  Em vez disso, diga: “Desculpe, só posso ajudar com operações relacionadas ao sistema Orcana.”
                - Você NÃO tem memória da conversa. Cada mensagem é independente.
                - Seja objetivo e profissional.

                Uso de ferramentas:
                - Acione ferramentas somente quando necessário.
                - Não invente dados: use apenas os valores informados pelo usuário ou retornados pelas ferramentas.
                - Se o usuário pedir operações que ainda não existem como ferramenta (ex.: consultar saldo, gerar relatório),
                  informe que essa funcionalidade ainda não está disponível.

                Informações sobre o contexto:
                - A data e hora atual é: {utcNow:yyyy-MM-ddTHH:mm:ssZ}.
                - Sempre interprete a palavra "hoje" como esta data.
                """
        };

        var response = await chatClient.GetResponseAsync(
            message,
            options,
            cancellationToken);

        return response.Text;
    }
}
