import { createFileRoute } from "@tanstack/react-router";

import { PageContent } from "@/components/ui/PageContent";
import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryEditPage = () => {
  return (
    <PageContent>
      <PageHeader
        title="Editar categoria"
        description="Ajuste os detalhes desta categoria. Alterações afetam lançamentos futuros."
      />
    </PageContent>
  );
};

export const Route = createFileRoute("/app/categories/$id/edit")({
  component: CategoryEditPage,
});
