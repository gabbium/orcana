import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/utils/cn";

import type { DrawerOverlayProps } from "./DrawerOverlay.types";

export const DrawerOverlay = ({ className, ...props }: DrawerOverlayProps) => {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
};
