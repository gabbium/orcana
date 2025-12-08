import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
  return <div>Welcome to the /app route!</div>;
};

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});
