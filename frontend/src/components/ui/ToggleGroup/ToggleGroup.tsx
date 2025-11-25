import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, useContext, type ComponentProps } from "react";

import { cn } from "@/utils/cn";

import { toggleVariants, type ToggleVariants } from "../Toggle/Toggle.variants";

const ToggleGroupContext = createContext<
  ToggleVariants & {
    spacing?: number;
  }
>({
  size: "default",
  variant: "default",
  spacing: 0,
});

export type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> &
  ToggleVariants & {
    spacing?: number;
  };

export const ToggleGroup = ({
  className,
  variant,
  size,
  spacing = 0,
  children,
  ...props
}: ToggleGroupProps) => {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
};

export type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> &
  ToggleVariants;

export const ToggleGroupItem = ({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) => {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
};
