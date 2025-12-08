import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/categories/$id")({
  loader: async ({ params }) => {
    return {
      crumb: `Category ${params.id}`,
    };
  },
  component: Outlet,
});
