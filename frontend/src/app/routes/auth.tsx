import { Outlet, createFileRoute } from "@tanstack/react-router";

const AuthRoot = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/auth")({
  component: AuthRoot,
});
