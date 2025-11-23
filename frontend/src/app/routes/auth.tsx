import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "@/components/layouts/AuthLayout";

const AuthRoot = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

export const Route = createFileRoute("/auth")({
  component: AuthRoot,
});
