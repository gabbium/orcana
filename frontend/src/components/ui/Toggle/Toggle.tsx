import * as TogglePrimitive from "@radix-ui/react-toggle";

import { cn } from "@/utils/cn";

import type { ToggleProps } from "./Toggle.types";
import { toggleVariants } from "./Toggle.variants";

export const Toggle = ({ className, variant, size, ...props }: ToggleProps) => {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};
