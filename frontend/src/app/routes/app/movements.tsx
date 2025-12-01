import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import {
  MovementsFilters,
  MovementsHeader,
  MovementsSummary,
  MovementsTable,
  movementsQueries,
  movementsSearchSchema,
} from "@/features/movements";

const MovementsPage = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const movementsQuery = useSuspenseQuery(
    movementsQueries.list({
      pageNumber: search.pageNumber,
      pageSize: search.pageSize,
      direction: search.direction === "All" ? [] : [search.direction],
      minOccurredAt: search.minOccurredAt,
      maxOccurredAt: search.maxOccurredAt,
    }),
  );
  const summaryQuery = useSuspenseQuery(
    movementsQueries.summary({
      minOccurredAt: search.minOccurredAt,
      maxOccurredAt: search.maxOccurredAt,
    }),
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <MovementsHeader
        onAddExpense={() =>
          navigate({
            to: "/app/movements/create/expense",
            search: (old) => old,
          })
        }
        onAddIncome={() =>
          navigate({
            to: "/app/movements/create/income",
            search: (old) => old,
          })
        }
      />
      <main className="flex flex-1 flex-col gap-4 px-6 py-4">
        <MovementsFilters
          minOccurredAt={search.minOccurredAt}
          maxOccurredAt={search.maxOccurredAt}
          onMinOccurredAt={(minOccurredAt) =>
            navigate({
              search: (old) => ({
                ...old,
                pageNumber: 1,
                minOccurredAt,
              }),
            })
          }
          onMaxOccurredAt={(maxOccurredAt) =>
            navigate({
              search: (old) => ({
                ...old,
                pageNumber: 1,
                maxOccurredAt,
              }),
            })
          }
          direction={search.direction}
          onDirectionChange={(direction) => {
            navigate({
              search: (old) => ({
                ...old,
                pageNumber: 1,
                direction,
              }),
            });
          }}
        />
        <MovementsSummary summary={summaryQuery.data} />
        <MovementsTable
          movements={movementsQuery.data}
          onPaginationChange={(pageNumber, pageSize) =>
            navigate({
              search: (old) => ({
                ...old,
                pageNumber,
                pageSize,
              }),
            })
          }
        />
      </main>
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/app/movements")({
  validateSearch: movementsSearchSchema,
  loaderDeps: ({ search }) => ({ search }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      movementsQueries.list({
        pageNumber: deps.search.pageNumber,
        pageSize: deps.search.pageSize,
        direction: deps.search.direction === "All" ? [] : [deps.search.direction],
        minOccurredAt: deps.search.minOccurredAt,
        maxOccurredAt: deps.search.maxOccurredAt,
      }),
    );
    await context.queryClient.ensureQueryData(
      movementsQueries.summary({
        minOccurredAt: deps.search.minOccurredAt,
        maxOccurredAt: deps.search.maxOccurredAt,
      }),
    );
  },
  component: MovementsPage,
});
