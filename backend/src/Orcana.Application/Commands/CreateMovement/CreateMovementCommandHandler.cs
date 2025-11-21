using Orcana.Application.Models;
using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Application.Commands.CreateMovement;

public class CreateMovementCommandHandler(
    IMovementRepository movementRepository)
    : ICommandHandler<CreateMovementCommand, Result<MovementDto>>
{
    public async ValueTask<Result<MovementDto>> Handle(
        CreateMovementCommand command,
        CancellationToken cancellationToken)
    {
        var movement = new Movement(
            Guid.Empty,
            command.Direction,
            command.Amount,
            command.Description,
            command.OccurredAt);

        await movementRepository.AddAsync(movement, cancellationToken);
        await movementRepository.UnitOfWork.SaveChangesAsync(cancellationToken);

        return new MovementDto()
        {
            Id = movement.Id,
            Direction = movement.Direction,
            Amount = movement.Amount,
            Description = movement.Description,
            OccurredAt = movement.OccurredAt
        };
    }
}
