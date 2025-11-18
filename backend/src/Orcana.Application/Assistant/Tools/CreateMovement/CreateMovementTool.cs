using Orcana.Application.Commands.CreateMovement;
using Orcana.Application.Models;

namespace Orcana.Application.Assistant.Tools.CreateMovement;

public sealed class CreateMovementTool(IMediator mediator)
{
    public const string Name = "create_movement";

    public const string Description = """
        Registra uma nova movimentação financeira no sistema Orcana.

        Parâmetros:
        - Direction: Direção da movimentação. Valores permitidos: Income, Expense.
        - Amount: Valor monetário da movimentação (deve ser maior que zero).
        - Description: Descrição opcional (ex.: "Almoço com cliente", "Salário de junho").
        - OccurredAt: Data e hora da movimentação em formato ISO 8601 UTC (ex.: 2025-06-10T15:00:00Z).

        Use esta ferramenta quando o usuário pedir para registrar/adicionar/lançar uma movimentação financeira.
        """;

    public async Task<Result<MovementDto>> ExecuteAsync(
        CreateMovementToolArgs request,
        CancellationToken cancellationToken = default)
    {
        var command = new CreateMovementCommand
        {
            Direction = request.Direction,
            Amount = request.Amount,
            Description = request.Description,
            OccurredAt = request.OccurredAt
        };

        return await mediator.SendAsync(command, cancellationToken);
    }
}
