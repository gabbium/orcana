import { Loader2Icon } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type SpinnerProps = ComponentProps<"svg">;

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
