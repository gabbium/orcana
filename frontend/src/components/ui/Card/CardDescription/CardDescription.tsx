import { cn } from "@/utils/cn";

import type { CardDescriptionProps } from "./CardDescription.types";

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};
