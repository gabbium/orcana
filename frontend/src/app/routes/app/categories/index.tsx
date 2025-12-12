import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";
import {
  CategoryList,
  useCategories,
  CATEGORY_KIND,
  getCategoriesInputSchema,
  type CategoryKind,
} from "@/features/categories";

const ListCategoriesPage = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const categoriesQuery = useCategories({
    params: search,
  });

  const handleKindChange = (kind: CategoryKind) => {
    navigate({
      search: (old) => ({
        ...old,
        kind,
      }),
    });
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-foreground">Categorias</h1>
          <p className="text-xs text-muted-foreground">
            Gerencie suas categorias de despesas e receitas
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NativeSelect
            value={search.kind}
            onChange={(e) => handleKindChange(e.target.value as CategoryKind)}
          >
            <NativeSelectOption value={CATEGORY_KIND.EXPENSE}>Despesas</NativeSelectOption>
            <NativeSelectOption value={CATEGORY_KIND.INCOME}>Receitas</NativeSelectOption>
          </NativeSelect>
          <Button
            onClick={() => navigate({ to: "/app/categories/create" })}
            className="hidden sm:flex"
          >
            Nova categoria
          </Button>
        </div>
      </div>
      <CategoryList categories={categoriesQuery.data || []} isLoading={categoriesQuery.isPending} />
      <FloatingActionButton
        icon={<PlusIcon />}
        onClick={() => navigate({ to: "/app/categories/create" })}
        className="sm:hidden"
      />
    </div>
  );
};

export const Route = createFileRoute("/app/categories/")({
  validateSearch: getCategoriesInputSchema,
  loaderDeps: ({ search }) => ({ search }),
  component: ListCategoriesPage,
});
