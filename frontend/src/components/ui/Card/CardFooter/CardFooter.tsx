import { cn } from "@/utils/cn";

import type { CardFooterProps } from "./CardFooter.types";

export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
};
