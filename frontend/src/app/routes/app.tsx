import { Outlet, createFileRoute } from "@tanstack/react-router";

const AppRoot = () => {
  return <Outlet />;
};

export const Route = createFileRoute("/app")({
  component: AppRoot,
});
