import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AppLayout } from "@/components/layouts/AppLayout";

const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const Route = createFileRoute("/app")({
  component: AppRoot,
});
