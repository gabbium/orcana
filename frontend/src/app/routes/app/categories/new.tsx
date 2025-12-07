import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryCreatePage = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <PageHeader
        title="Nova categoria"
        description="Defina as informações da categoria para começar a utilizá-la."
      />
    </div>
  );
};

export const Route = createFileRoute("/app/categories/new")({
  component: CategoryCreatePage,
});
