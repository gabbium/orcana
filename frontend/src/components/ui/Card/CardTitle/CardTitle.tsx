import { cn } from "@/utils/cn";

import type { CardTitleProps } from "./CardTitle.types";

export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
};
