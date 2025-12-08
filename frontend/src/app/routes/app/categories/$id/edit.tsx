import { createFileRoute } from "@tanstack/react-router";

import { PageContent } from "@/components/ui/PageContent";
import { PageHeader } from "@/components/ui/PageHeader";

export const CategoryEditPage = () => {
  return (
    <PageContent>
      <PageHeader title="Edit Category" />
    </PageContent>
  );
};

export const Route = createFileRoute("/app/categories/$id/edit")({
  loader: async () => {
    return {
      crumb: "Edit",
    };
  },
  component: CategoryEditPage,
});
