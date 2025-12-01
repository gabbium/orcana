namespace Orcana.Api.Infrastructure;

public static class ResultExtensions
{
    public static IActionResult ToActionResult(this Ardalis.Result.IResult result, ControllerBase controller)
    {
        return result.Status switch
        {
            ResultStatus.Ok => Ok(result, controller),
            ResultStatus.Created => Created(result, controller),
            ResultStatus.NoContent => NoContent(controller),
            ResultStatus.NotFound => NotFound(result, controller),
            ResultStatus.Unauthorized => Unauthorized(controller),
            ResultStatus.Forbidden => Forbidden(controller),
            ResultStatus.Invalid => Invalid(result, controller),
            ResultStatus.Conflict => Conflict(result, controller),
            ResultStatus.Error => Unprocessable(result, controller),
            ResultStatus.Unavailable => Unavailable(result, controller),
            ResultStatus.CriticalError => CriticalError(result, controller),
            _ => throw new NotSupportedException($"Status {result.Status} not supported")
        };
    }

    private static IActionResult Ok(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return result is Ardalis.Result.Result
            ? controller.Ok()
            : controller.Ok(result.GetValue());
    }

    private static CreatedResult Created(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return controller.Created(string.Empty, result.GetValue());
    }

    private static NoContentResult NoContent(ControllerBase controller)
    {
        return controller.NoContent();
    }

    private static NotFoundObjectResult NotFound(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return controller.NotFound(BuildErrorDetails(result));
    }

    private static UnauthorizedResult Unauthorized(ControllerBase controller)
    {
        return controller.Unauthorized();
    }

    private static ForbidResult Forbidden(ControllerBase controller)
    {
        return controller.Forbid();
    }

    private static ConflictObjectResult Conflict(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return controller.Conflict(BuildErrorDetails(result));
    }

    private static ObjectResult Unprocessable(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return controller.Problem(
            title: "Unprocessable Entity",
            detail: BuildErrorDetails(result),
            statusCode: StatusCodes.Status422UnprocessableEntity);
    }

    private static ObjectResult Unavailable(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return controller.Problem(
            title: "Service Unavailable",
            detail: BuildErrorDetails(result),
            statusCode: StatusCodes.Status503ServiceUnavailable);
    }

    private static ObjectResult CriticalError(Ardalis.Result.IResult result, ControllerBase controller)
    {
        return controller.Problem(
            title: "Server Failure",
            detail: BuildErrorDetails(result),
            statusCode: StatusCodes.Status500InternalServerError);
    }

    private static ActionResult Invalid(Ardalis.Result.IResult result, ControllerBase controller)
    {
        if (result.ValidationErrors == null || !result.ValidationErrors.Any())
            return controller.BadRequest(BuildErrorDetails(result));

        var dict = new ModelStateDictionary();

        foreach (var e in result.ValidationErrors)
        {
            var key = e.Identifier ?? string.Empty;
            dict.AddModelError(key, e.ErrorMessage);
        }

        return controller.ValidationProblem(dict);
    }

    private static string BuildErrorDetails(Ardalis.Result.IResult result)
    {
        if (result.Errors == null || !result.Errors.Any())
            return "An unexpected error occurred.";

        if (result.Errors.Count() == 1)
            return result.Errors.First();

        var sb = new StringBuilder("Errors:");

        foreach (var error in result.Errors)
            sb.AppendLine().Append("* ").Append(error);

        return sb.ToString();
    }
}
