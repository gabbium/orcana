import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { Separator } from "@/components/ui/Separator";
import { cn } from "@/utils/cn";

import { buttonGroupVariants, type ButtonGroupVariants } from "./ButtonGroup.variants";

export type ButtonGroupProps = ComponentProps<"div"> & ButtonGroupVariants;

export const ButtonGroup = ({ className, orientation, ...props }: ButtonGroupProps) => {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
};

export type ButtonGroupTextProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export const ButtonGroupText = ({ className, asChild = false, ...props }: ButtonGroupTextProps) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
};

export type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>;

export const ButtonGroupSeparator = ({
  className,
  orientation = "vertical",
  ...props
}: ButtonGroupSeparatorProps) => {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative m-0! self-stretch data-[orientation=vertical]:h-auto",
        className,
      )}
      {...props}
    />
  );
};
