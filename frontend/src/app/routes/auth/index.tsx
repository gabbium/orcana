import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <div>Hello "/auth/"!</div>;
};

export const Route = createFileRoute("/auth/")({
  component: RouteComponent,
});
