import { cn } from "@/utils/cn";

import type { FieldProps } from "./Field.types";
import { fieldVariants } from "./Field.variants";

export const Field = ({ className, orientation = "vertical", ...props }: FieldProps) => {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
};
