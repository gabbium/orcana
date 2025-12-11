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
  type CategoryKind,
} from "@/features/categories";

const CategoriesPage = () => {
  const [kind, setKind] = useState<CategoryKind>(CATEGORY_KIND.EXPENSE);

  const { data, isPending } = useQuery(categoriesQueries.list({ kinds: [kind] }));

  return (
    <div className="flex flex-col gap-4 relative">
      <CategoryToolbar kind={kind} onKindChange={setKind} />

      {isPending && (
        <ItemGroup className="gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </ItemGroup>
      )}

      {data && (
        <ItemGroup className="gap-2">
          {data.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              icon={category.icon}
              status={category.status}
              transactionCount={category.transactionCount}
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
