import { createFileRoute } from "@tanstack/react-router";

import { PageContent } from "@/components/ui/PageContent";
import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryViewPage = () => {
  return (
    <PageContent>
      <PageHeader
        title="Detalhes da categoria"
        description="Informações completas sobre esta categoria."
      />
    </PageContent>
  );
};

export const Route = createFileRoute("/app/categories/$id/")({
  component: CategoryViewPage,
});
