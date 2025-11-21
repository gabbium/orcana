namespace Orcana.Api.Infrastructure;

public class DefaultExceptionHandler : IExceptionHandler
{
    private readonly ILogger<DefaultExceptionHandler> _logger;
    private readonly Dictionary<Type, Func<HttpContext, Exception, Task>> _exceptionHandlers;

    public DefaultExceptionHandler(ILogger<DefaultExceptionHandler> logger)
    {
        _logger = logger;
        _exceptionHandlers = new()
        {
            { typeof(FluentValidation.ValidationException), HandleValidationException },
        };
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var exceptionType = exception.GetType();

        if (_exceptionHandlers.TryGetValue(
            exceptionType,
            out Func<HttpContext, Exception, Task>? value))
        {
            await value.Invoke(httpContext, exception);
            return true;
        }

        _logger.LogError(exception, "An unhandled exception has occurred while executing the request");

        var problem = Results.Problem(
            title: "Server failure",
            detail: "An unexpected error occurred",
            statusCode: StatusCodes.Status500InternalServerError,
            type: "https://www.rfc-editor.org/rfc/rfc9110#name-500-internal-server-error");

        await problem.ExecuteAsync(httpContext);

        return true;
    }

    private static async Task HandleValidationException(
        HttpContext httpContext,
        Exception ex)
    {
        var exception = (FluentValidation.ValidationException)ex;

        var errors = exception.Errors
            .GroupBy(e => e.PropertyName)
            .ToDictionary(
                group => group.Key,
                group => group.Select(e => e.ErrorMessage).ToArray());

        var problem = Results.ValidationProblem(
            errors: errors,
            statusCode: StatusCodes.Status400BadRequest,
            title: "Bad Request",
            type: "https://www.rfc-editor.org/rfc/rfc9110#name-400-bad-request",
            detail: "One or more validation errors occurred.");

        await problem.ExecuteAsync(httpContext);
    }
}

