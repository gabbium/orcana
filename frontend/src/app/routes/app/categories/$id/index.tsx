import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryViewPage = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <PageHeader
        title="Detalhes da categoria"
        description="Informações completas sobre esta categoria."
      />
    </div>
  );
};

export const Route = createFileRoute("/app/categories/$id/")({
  component: CategoryViewPage,
});
