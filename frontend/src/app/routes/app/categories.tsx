import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  categoriesQueries,
  CATEGORY_KIND,
  CategoryList,
  CategoryListSkeleton,
  CategoryToolbar,
  type CategoryFilter,
} from "@/features/categories";

const CategoriesPage = () => {
  const [filter, setFilter] = useState<CategoryFilter>({
    kind: CATEGORY_KIND.EXPENSE,
  });

  const categoriesQuery = useQuery(categoriesQueries.list({ kinds: filter.kind }));

  return (
    <div className="flex flex-col gap-4 relative">
      <CategoryToolbar filter={filter} onFilterChange={setFilter} />

      {categoriesQuery.isPending && <CategoryListSkeleton />}
      {categoriesQuery.data && <CategoryList categories={categoriesQuery.data} />}

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
