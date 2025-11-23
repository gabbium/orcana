import { Loader2Icon } from "lucide-react";

import { cn } from "@/utils/cn";

import type { SpinnerProps } from "./Spinner.types";

export const Spinner = ({ className, ...props }: SpinnerProps) => {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
};
