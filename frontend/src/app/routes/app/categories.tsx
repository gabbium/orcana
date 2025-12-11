import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ItemGroup } from "@/components/ui/Item";
import {
  categoriesQueries,
  CATEGORY_KIND,
  CategoryCard,
  CategoryCardSkeleton,
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

      {categoriesQuery.isPending && (
        <ItemGroup className="gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </ItemGroup>
      )}

      {categoriesQuery.data && (
        <ItemGroup className="gap-2">
          {categoriesQuery.data.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon={category.icon}
              status={category.status}
            />
          ))}
        </ItemGroup>
      )}

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
