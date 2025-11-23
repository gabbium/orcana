import { cn } from "@/utils/cn";

import type { FieldLegendProps } from "./FieldLegend.types";

export const FieldLegend = ({ className, variant = "legend", ...props }: FieldLegendProps) => {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        "data-[variant=legend]:text-base",
        "data-[variant=label]:text-sm",
        className,
      )}
      {...props}
    />
  );
};
