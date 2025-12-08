import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/categories")({
  loader: async () => {
    return {
      crumb: "Categories",
    };
  },
  component: Outlet,
});
