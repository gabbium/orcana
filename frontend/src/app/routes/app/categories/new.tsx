import { createFileRoute } from "@tanstack/react-router";

import { PageContent } from "@/components/ui/PageContent";
import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryCreatePage = () => {
  return (
    <PageContent>
      <PageHeader title="New Category" />
    </PageContent>
  );
};

export const Route = createFileRoute("/app/categories/new")({
  loader: async () => {
    return {
      crumb: "New Category",
    };
  },
  component: CategoryCreatePage,
});
