import { createFileRoute } from "@tanstack/react-router";

const LandingPage = () => {
  return <main className="text-xl font-bold">Hello world!</main>;
};

export const Route = createFileRoute("/")({
  component: LandingPage,
});
