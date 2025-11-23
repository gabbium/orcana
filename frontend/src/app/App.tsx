import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Suspense } from "react";

import { Spinner } from "@/components/ui/Spinner";
import { queryClient } from "@/lib/react-query";

import { router } from "./router";

export const App = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Suspense>
  );
};
