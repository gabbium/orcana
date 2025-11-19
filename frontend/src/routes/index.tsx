import { createFileRoute } from "@tanstack/react-router";

const LandingPage = () => {
  return <main>Hello world!</main>;
};

export const Route = createFileRoute("/")({
  component: LandingPage,
});
