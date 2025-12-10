import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  CategoryList,
  CategorySkeletonList,
  CategoryToolbar,
  categoriesQueries,
  CATEGORY_KIND,
  type CategoryKind,
} from "@/features/categories";

const CategoriesPage = () => {
  const [kind, setKind] = useState<CategoryKind>(CATEGORY_KIND.EXPENSE);

  const { data, isPending } = useQuery(categoriesQueries.list({ kinds: [kind] }));

  return (
    <div className="flex flex-col gap-3 sm:gap-4 relative">
      <CategoryToolbar kind={kind} onKindChange={setKind} />

      {isPending ? <CategorySkeletonList /> : <CategoryList categories={data ?? []} />}

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
