namespace Orcana.Application.Queries.ListMovements;

public class ListMovementsQueryValidator
    : AbstractValidator<ListMovementsQuery>
{
    public ListMovementsQueryValidator()
    {
        RuleFor(q => q.PageNumber)
            .GreaterThan(0);

        RuleFor(q => q.PageSize)
            .GreaterThan(0)
            .LessThanOrEqualTo(100);

        RuleFor(q => q.Order)
            .Matches("^(occurredat|amount) (asc|desc)$", RegexOptions.IgnoreCase)
            .When(q => q.Order is not null);

        RuleFor(q => q.MinOccurredAt)
            .LessThanOrEqualTo(q => q.MaxOccurredAt)
            .When(q => q.MinOccurredAt is not null && q.MaxOccurredAt is not null);
    }
}
