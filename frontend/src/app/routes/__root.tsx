import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { Devtools } from "@/components/devtools";

type RouteContext = {
  queryClient: QueryClient;
};

const RootLayout = () => {
  return (
    <>
      {import.meta.env.DEV && <Devtools />}
      <Outlet />
    </>
  );
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: RootLayout,
});
