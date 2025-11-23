import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/cn";

import type { DrawerTitleProps } from "./DrawerTitle.types";

export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
};
