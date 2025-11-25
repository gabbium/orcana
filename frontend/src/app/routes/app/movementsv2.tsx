import { createFileRoute } from "@tanstack/react-router";

import {
  MovementsFilters,
  MovementsHeader,
  MovementsSummary,
  MovementsTable,
} from "@/features/movements";

const MovementsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <MovementsHeader />
      <main className="flex flex-1 flex-col gap-4 px-6 py-4">
        <MovementsFilters />
        <MovementsSummary />
        <MovementsTable />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/app/movementsv2")({
  component: MovementsPage,
});
