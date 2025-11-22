import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/app/movements" className="[&.active]:font-bold">
          Movements
        </Link>
      </div>
    </>
  ),
});
