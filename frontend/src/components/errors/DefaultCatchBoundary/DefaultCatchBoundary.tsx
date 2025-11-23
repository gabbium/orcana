import { Link, rootRouteId, useMatch, useRouter } from "@tanstack/react-router";
import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const DefaultCatchBoundary = () => {
  const router = useRouter();

  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangleIcon className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-base text-muted-foreground max-w-md">
          We&apos;re sorry, but an unexpected error has occurred.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {isRoot ? (
          <Button asChild>
            <Link to="/">Go to Home</Link>
          </Button>
        ) : (
          <Button onClick={() => window.history.back()}>Go Back</Button>
        )}
        <Button variant="secondary" onClick={() => router.invalidate()}>
          Try Again
        </Button>
      </div>
    </div>
  );
};
