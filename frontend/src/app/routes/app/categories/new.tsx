import { createFileRoute } from "@tanstack/react-router";

import { PageContent } from "@/components/ui/PageContent";
import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryCreatePage = () => {
  return (
    <PageContent>
      <PageHeader
        title="Nova categoria"
        description="Defina as informações da categoria para começar a utilizá-la."
      />
    </PageContent>
  );
};

export const Route = createFileRoute("/app/categories/new")({
  component: CategoryCreatePage,
});
