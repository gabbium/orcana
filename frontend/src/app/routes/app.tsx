import { createFileRoute, Outlet } from "@tanstack/react-router";

import { MainLayout } from "@/components/layout/MainLayout";

const RouteComponent = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const Route = createFileRoute("/app")({
  component: RouteComponent,
});
