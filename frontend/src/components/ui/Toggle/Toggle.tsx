import * as TogglePrimitive from "@radix-ui/react-toggle";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

import { toggleVariants } from "./Toggle.variants";

export type ToggleProps = ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>;

export const Toggle = ({ className, variant, size, ...props }: ToggleProps) => {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
};
