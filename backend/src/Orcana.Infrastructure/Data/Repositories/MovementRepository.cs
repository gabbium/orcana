using Orcana.Domain.AggregatesModel.MovementAggregate;
using Orcana.Domain.SeedWork;

namespace Orcana.Infrastructure.Data.Repositories;

public class MovementRepository(OrcanaContext context) : IMovementRepository
{
    public IUnitOfWork UnitOfWork => context;

    public async Task AddAsync(Movement movement, CancellationToken cancellationToken)
    {
        await context.Movements.AddAsync(movement, cancellationToken);
    }
}
