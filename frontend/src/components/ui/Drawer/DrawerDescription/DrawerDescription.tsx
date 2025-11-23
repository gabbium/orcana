import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/cn";

import type { DrawerDescriptionProps } from "./DrawerDescription.types";

export const DrawerDescription = ({ className, ...props }: DrawerDescriptionProps) => {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};
