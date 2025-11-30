namespace Orcana.Application.Queries.GetMovementsSummary;

public class GetMovementsSummaryQueryValidator
    : AbstractValidator<GetMovementsSummaryQuery>
{
    public GetMovementsSummaryQueryValidator()
    {
        RuleFor(q => q.MinOccurredAt)
            .LessThanOrEqualTo(q => q.MaxOccurredAt)
            .When(q => q.MinOccurredAt is not null && q.MaxOccurredAt is not null);
    }
}
