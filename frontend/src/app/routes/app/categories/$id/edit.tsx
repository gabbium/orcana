import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryEditPage = () => {
  return (
    <div className="flex flex-1 flex-col space-y-4">
      <PageHeader
        title="Editar categoria"
        description="Ajuste os detalhes desta categoria. Alterações afetam lançamentos futuros."
      />
    </div>
  );
};

export const Route = createFileRoute("/app/categories/$id/edit")({
  component: CategoryEditPage,
});
