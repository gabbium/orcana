namespace Orcana.Api.Infrastructure;

public static partial class ResultExtensions
{
    public static IResult ToMinimalApiResult(this Ardalis.Result.IResult result)
    {
        return result.Status switch
        {
            Ardalis.Result.ResultStatus.Ok => result is Ardalis.Result.Result
                ? Results.Ok()
                : Results.Ok(result.GetValue()),

            Ardalis.Result.ResultStatus.Created => Results.Created(string.Empty, result.GetValue()),

            Ardalis.Result.ResultStatus.NoContent => Results.NoContent(),

            Ardalis.Result.ResultStatus.NotFound => Problem(result,
                title: "Not Found",
                statusCode: StatusCodes.Status404NotFound,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-404-not-found"),

            Ardalis.Result.ResultStatus.Unauthorized => Problem(result,
                title: "Unauthorized",
                statusCode: StatusCodes.Status401Unauthorized,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-401-unauthorized"),

            Ardalis.Result.ResultStatus.Forbidden => Problem(result,
                title: "Forbidden",
                statusCode: StatusCodes.Status403Forbidden,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-403-forbidden"),

            Ardalis.Result.ResultStatus.Invalid => ValidationProblem(result),

            Ardalis.Result.ResultStatus.Error => Problem(result,
                title: "Unprocessable Entity",
                statusCode: StatusCodes.Status422UnprocessableEntity,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-422-unprocessable-content"),

            Ardalis.Result.ResultStatus.Conflict => Problem(result,
                title: "Conflict",
                statusCode: StatusCodes.Status409Conflict,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-409-conflict"),

            Ardalis.Result.ResultStatus.Unavailable => Problem(result,
                title: "Service Unavailable",
                statusCode: StatusCodes.Status503ServiceUnavailable,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-503-service-unavailable"),

            Ardalis.Result.ResultStatus.CriticalError => Problem(result,
                title: "Server Failure",
                statusCode: StatusCodes.Status500InternalServerError,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-500-internal-server-error"),

            _ => throw new NotSupportedException($"Result {result.Status} conversion is not supported.")
        };
    }

    private static IResult ValidationProblem(Ardalis.Result.IResult result)
    {
        if (result.ValidationErrors is null || !result.ValidationErrors.Any())
        {
            return Results.Problem(
                title: "Bad Request",
                detail: BuildErrorDetails(result),
                statusCode: StatusCodes.Status400BadRequest,
                type: "https://www.rfc-editor.org/rfc/rfc9110#name-400-bad-request");
        }

        var errors = result.ValidationErrors
            .GroupBy(e => e.Identifier ?? string.Empty)
            .ToDictionary(
                g => g.Key,
                g => g.Select(e => e.ErrorMessage).ToArray());

        return Results.ValidationProblem(
            errors: errors,
            statusCode: StatusCodes.Status400BadRequest,
            title: "Bad Request",
            type: "https://www.rfc-editor.org/rfc/rfc9110#name-400-bad-request",
            detail: "One or more validation errors occurred.");
    }

    private static IResult Problem(
        Ardalis.Result.IResult result,
        string title,
        int statusCode,
        string type)
    {
        var detail = BuildErrorDetails(result);

        return Results.Problem(
            title: title,
            detail: detail,
            statusCode: statusCode,
            type: type);
    }

    private static string BuildErrorDetails(Ardalis.Result.IResult result)
    {
        if (result.Errors is null || !result.Errors.Any())
        {
            return "An unexpected error occurred.";
        }

        if (result.Errors.Count() == 1)
        {
            return result.Errors.First();
        }

        var sb = new StringBuilder("Next error(s) occurred:");

        foreach (var error in result.Errors)
        {
            sb.AppendLine().Append("* ").Append(error);
        }

        return sb.ToString();
    }
}
