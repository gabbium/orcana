import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { CategoriesTable, CategoriesHeader, categoriesQueries } from "@/features/categories";

export const CategoriesPage = () => {
  const categoriesQuery = useSuspenseQuery(categoriesQueries.list());

  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <CategoriesHeader />
      <CategoriesTable categories={categoriesQuery.data} />
    </main>
  );
};

export const Route = createFileRoute("/app/categories/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(categoriesQueries.list());
  },
  component: CategoriesPage,
});
