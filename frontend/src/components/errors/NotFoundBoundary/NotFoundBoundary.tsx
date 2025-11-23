import { Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const NotFoundBoundary = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center space-y-6">
      <div className="flex flex-col items-center space-y-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="text-base text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild aria-label="Go to home page">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
};
