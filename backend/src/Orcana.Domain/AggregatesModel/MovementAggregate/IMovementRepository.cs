using Orcana.Domain.SeedWork;

namespace Orcana.Domain.AggregatesModel.MovementAggregate;

public interface IMovementRepository : IRepository<Movement>
{
    Task AddAsync(Movement movement, CancellationToken cancellationToken);
}
