import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  CategoryForm,
  CategoryFormSkeleton,
  useCategory,
  useUpdateCategory,
  type CategoryFormSchema,
} from "@/features/categories";

const UpdateCategoryPage = () => {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { data: category, isLoading } = useCategory({ categoryId: id });

  const updateCategoryMutation = useUpdateCategory({
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: "/app/categories", search: (prev) => prev });
      },
    },
  });

  const handleSubmit = (value: CategoryFormSchema) => {
    updateCategoryMutation.mutate({
      data: value,
      categoryId: id,
    });
  };

  const handleCancel = () => {
    navigate({ to: "/app/categories", search: (prev) => prev });
  };

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeftIcon className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Editar categoria</h1>
          <p className="text-xs text-muted-foreground">Atualize os dados da categoria</p>
        </div>
      </div>

      {isLoading || !category ? (
        <CategoryFormSkeleton />
      ) : (
        <CategoryForm
          defaultValues={category}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateCategoryMutation.isPending}
        />
      )}
    </div>
  );
};

export const Route = createFileRoute("/app/categories/$id/edit")({
  component: UpdateCategoryPage,
});
