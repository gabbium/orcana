import { Drawer as DrawerPrimitive } from "vaul";

import type { DrawerCloseProps } from "./DrawerClose.types";

export const DrawerClose = ({ ...props }: DrawerCloseProps) => {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
};
