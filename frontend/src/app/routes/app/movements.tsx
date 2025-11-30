import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import {
  MovementsFilters,
  MovementsHeader,
  MovementsSearchDirection,
  MovementsSummary,
  MovementsTable,
  movementsQueries,
  movementsSearchSchema,
} from "@/features/movements";
import { addMonthYear, formatMonthYearLabel, mapSearchToDateRange } from "@/utils/format";

const MovementsPage = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const { startDate, endDate } = mapSearchToDateRange(search.month, search.year);

  const movementsQuery = useSuspenseQuery(
    movementsQueries.list({
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      direction: search.direction == MovementsSearchDirection.All ? [] : [search.direction],
      minOccurredAt: startDate,
      maxOccurredAt: endDate,
    }),
  );
  const summaryQuery = useSuspenseQuery(
    movementsQueries.summary({
      minOccurredAt: startDate,
      maxOccurredAt: endDate,
    }),
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <MovementsHeader />
      <main className="flex flex-1 flex-col gap-4 px-6 py-4">
        <MovementsFilters
          period={formatMonthYearLabel(search.month, search.year)}
          onPrevPeriod={() =>
            navigate({
              search: (old) => {
                const { month, year } = addMonthYear(old.month, old.year, -1);
                return { ...old, month, year };
              },
            })
          }
          onNextPeriod={() =>
            navigate({
              search: (old) => {
                const { month, year } = addMonthYear(old.month, old.year, 1);
                return { ...old, month, year };
              },
            })
          }
          direction={search.direction}
          onDirectionChange={(direction) => {
            navigate({
              search: (old) => ({
                ...old,
                direction,
              }),
            });
          }}
        />
        <MovementsSummary summary={summaryQuery.data} />
        <MovementsTable movements={movementsQuery.data.items} />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/app/movements")({
  validateSearch: movementsSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps }) => {
    const { startDate, endDate } = mapSearchToDateRange(deps.search.month, deps.search.year);

    await context.queryClient.ensureQueryData(
      movementsQueries.list({
        pageNumber: deps.search.pageNumber,
        pageSize: deps.search.pageSize,
        direction:
          deps.search.direction == MovementsSearchDirection.All ? [] : [deps.search.direction],
        minOccurredAt: startDate,
        maxOccurredAt: endDate,
      }),
    );
    await context.queryClient.ensureQueryData(
      movementsQueries.summary({
        minOccurredAt: startDate,
        maxOccurredAt: endDate,
      }),
    );
  },
  component: MovementsPage,
});
