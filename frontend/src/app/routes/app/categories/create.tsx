import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { CategoryForm, useCreateCategory, type CategoryFormSchema } from "@/features/categories";

const CreateCategoryPage = () => {
  const navigate = useNavigate();

  const createCategoryMutation = useCreateCategory({
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: "/app/categories", search: (prev) => prev });
      },
    },
  });

  const handleSubmit = (value: CategoryFormSchema) => {
    createCategoryMutation.mutate(value);
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
          <h1 className="text-lg font-semibold text-foreground">Nova categoria</h1>
          <p className="text-xs text-muted-foreground">Preencha os dados da categoria</p>
        </div>
      </div>

      <CategoryForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createCategoryMutation.isPending}
      />
    </div>
  );
};

export const Route = createFileRoute("/app/categories/create")({
  component: CreateCategoryPage,
});
