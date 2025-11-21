using Orcana.Application.Behaviors;
using Orcana.Application.Commands.CreateMovement;

namespace Orcana.Application;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediator(options =>
        {
            options.ServiceLifetime = ServiceLifetime.Scoped;
            options.Assemblies =
            [
                typeof(CreateMovementCommand),
            ];
            options.PipelineBehaviors =
            [
                typeof(LoggingBehavior<,>),
                typeof(ValidationBehavior<,>)
            ];
        });

        services.AddValidatorsFromAssemblyContaining<CreateMovementCommand>();

        return services;
    }
}
