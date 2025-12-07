import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { CategoriesTable, categoriesQueries } from "@/features/categories";
import type { Category } from "@/features/categories/types/categories";

export const CategoriesListPage = () => {
  const categoriesQuery = useSuspenseQuery(categoriesQueries.list());

  const handleDelete = (category: Category) => {
    console.log("Delete category:", category);
  };

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <PageHeader
        title="Categorias"
        description="Gerencie categorias e aplique filtros para encontrar o que precisa."
        action={
          <Button size="sm" asChild>
            <Link to="/app/categories/new">
              <PlusIcon />
              Nova categoria
            </Link>
          </Button>
        }
      />
      <CategoriesTable categories={categoriesQuery.data} onRowDelete={handleDelete} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(categoriesQueries.list());
  },
  component: CategoriesListPage,
});
