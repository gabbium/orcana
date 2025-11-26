import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

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
    }),
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <MovementsHeader />
      <main className="flex flex-1 flex-col gap-4 px-6 py-4">
        <MovementsFilters
          direction={search.direction}
          onDirectionChange={(direction) =>
            navigate({
              search: (old) => ({
                ...old,
                direction,
              }),
            })
          }
        />
        <MovementsSummary />
        <MovementsTable movements={movementsQuery.data.items} />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/app/movements")({
  validateSearch: movementsSearchSchema,
  loaderDeps: ({ search }) => ({
    search,
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(
      movementsQueries.list({
        pageNumber: deps.search.pageNumber,
        pageSize: deps.search.pageSize,
        direction: deps.search.direction == "all" ? [] : [deps.search.direction],
      }),
    );
  },
  component: MovementsPage,
});
