import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import {
  categoriesQueries,
  CATEGORY_KIND,
  CategoryForm,
  CategoryList,
  CategoryListSkeleton,
  CategoryToolbar,
  createCategory,
  type Category,
  type CategoryFilter,
} from "@/features/categories";

const CategoriesPage = () => {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<CategoryFilter>({
    kind: CATEGORY_KIND.EXPENSE,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const categoriesQuery = useQuery(categoriesQueries.list({ kinds: filter.kind }));

  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesQueries.all });
      setDialogOpen(false);
      setEditingCategory(null);
    },
  });

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleNewCategory = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <CategoryToolbar filter={filter} onFilterChange={setFilter} />

      {categoriesQuery.isPending && <CategoryListSkeleton />}
      {categoriesQuery.data && (
        <CategoryList categories={categoriesQuery.data} onEdit={handleEdit} />
      )}

      <ResponsiveDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingCategory ? "Editar categoria" : "Nova categoria"}
        closeButton={<Button variant="outline">Cancelar</Button>}
        submitButton={
          <Button type="submit" form="category-form" disabled={mutation.isPending}>
            {editingCategory ? "Atualizar" : "Salvar"}
          </Button>
        }
      >
        <CategoryForm
          kind={filter.kind}
          initialValues={editingCategory ?? undefined}
          onSubmit={(value) => {
            mutation.mutate(value);
          }}
        />
      </ResponsiveDialog>

      <FloatingActionButton icon={<PlusIcon />} onClick={handleNewCategory} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
