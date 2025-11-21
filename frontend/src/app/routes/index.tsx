import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <main className="text-xl font-bold">Hello world!</main>,
});
