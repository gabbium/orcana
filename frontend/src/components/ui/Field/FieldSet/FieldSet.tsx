import { cn } from "@/utils/cn";

import type { FieldSetProps } from "./FieldSet.types";

export const FieldSet = ({ className, ...props }: FieldSetProps) => {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        "flex flex-col gap-6",
        "has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3",
        className,
      )}
      {...props}
    />
  );
};
