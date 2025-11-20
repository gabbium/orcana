import { ChatAssistantPage } from "@/features/assistant";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: ChatAssistantPage,
});
