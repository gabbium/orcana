import { cn } from "@/utils/cn";

import type { CardContentProps } from "./CardContent.types";

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
};
