import * as TogglePrimitive from "@radix-ui/react-toggle";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

import { toggleVariants, type ToggleVariants } from "./Toggle.variants";

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> & ToggleVariants;

export const Toggle = ({ className, variant, size, ...props }: ToggleProps) => {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};
