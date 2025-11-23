import { cn } from "@/utils/cn";

import type { FieldTitleProps } from "./FieldTitle.types";

export const FieldTitle = ({ className, ...props }: FieldTitleProps) => {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
        className,
      )}
      {...props}
    />
  );
};
