using Orcana.Domain.AggregatesModel.MovementAggregate;

namespace Orcana.Infrastructure.Repositories;

internal sealed class MovementRepository(OrcanaContext context) : IMovementRepository
{
    public async Task AddAsync(Movement movement, CancellationToken cancellationToken = default)
    {
        await context.Movements.AddAsync(movement, cancellationToken);
    }
}
