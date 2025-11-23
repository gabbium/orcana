import { cn } from "@/utils/cn";

import type { FieldContentProps } from "./FieldContent.types";

export const FieldContent = ({ className, ...props }: FieldContentProps) => {
  return (
    <div
      data-slot="field-content"
      className={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
      {...props}
    />
  );
};
