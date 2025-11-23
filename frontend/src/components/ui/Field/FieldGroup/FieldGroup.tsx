import { cn } from "@/utils/cn";

import type { FieldGroupProps } from "./FieldGroup.types";

export const FieldGroup = ({ className, ...props }: FieldGroupProps) => {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className,
      )}
      {...props}
    />
  );
};
