import { Movements } from "@/features/movements";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/movements")({
  component: Movements,
});
