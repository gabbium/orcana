import { createFileRoute, Link } from "@tanstack/react-router";

const RouteComponent = () => {
  return (
    <div className="p-2 flex gap-2">
      <Link to="/app">App</Link>
      <Link to="/app/movements">Movements</Link>
      <Link to="/app/movementsv2">MovementsV2</Link>
      <Link to="/auth">Auth</Link>
      <Link to="/auth/login">Login</Link>
    </div>
  );
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});
