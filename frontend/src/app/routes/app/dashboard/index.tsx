import { createFileRoute } from "@tanstack/react-router";

import { PageContent } from "@/components/ui/PageContent";

export const Route = createFileRoute("/app/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageContent>Hello "/app/dashboard/"!</PageContent>;
}
