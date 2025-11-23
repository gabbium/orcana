import { createRouter } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@/components/errors/DefaultCatchBoundary";
import { NotFoundBoundary } from "@/components/errors/NotFoundBoundary";
import { queryClient } from "@/lib/react-query";

import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultErrorComponent: DefaultCatchBoundary,
  defaultNotFoundComponent: NotFoundBoundary,
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
