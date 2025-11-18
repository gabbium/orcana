using Orcana.Application.Models;
using Orcana.Domain.AggregatesModel.MovementAggregate;
using Orcana.Domain.SeedWork;

namespace Orcana.Application.Commands.CreateMovement;

internal sealed class CreateMovementCommandHandler(
    IMovementRepository movementRepository,
    IUnitOfWork unitOfWork)
    : ICommandHandler<CreateMovementCommand, Result<MovementDto>>
{
    public async Task<Result<MovementDto>> HandleAsync(
        CreateMovementCommand command,
        CancellationToken cancellationToken = default)
    {
        var movement = new Movement(
            Guid.Empty,
            command.Direction,
            command.Amount,
            command.Description,
            command.OccurredAt);

        await movementRepository.AddAsync(movement, cancellationToken);
        await unitOfWork.SaveChangesAsync(cancellationToken);

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
