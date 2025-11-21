import { createFileRoute } from "@tanstack/react-router";
import { Movements } from "@/features/movements";

export const Route = createFileRoute("/")({
  component: Movements,
});
