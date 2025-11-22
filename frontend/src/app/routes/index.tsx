import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/app" className="[&.active]:font-bold">
          App
        </Link>
      </div>
    </>
  ),
});
