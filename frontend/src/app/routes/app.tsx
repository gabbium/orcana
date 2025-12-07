import { Outlet, createFileRoute } from "@tanstack/react-router";

import { MainLayout } from "@/components/layouts/MainLayout";

const AppRoot = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const Route = createFileRoute("/app")({
  component: AppRoot,
});
