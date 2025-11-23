import { cn } from "@/utils/cn";

import type { InputGroupAddonProps } from "./InputGroupAddon.types";
import { inputGroupAddonVariants } from "./InputGroupAddon.variants";

export const InputGroupAddon = ({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
};
