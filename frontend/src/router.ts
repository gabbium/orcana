import { createRouter } from "@tanstack/react-router";

import { queryClient } from "./shared/libs/react-query/queryClient";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    queryClient,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
