import { Drawer as DrawerPrimitive } from "vaul";

import type { DrawerProps } from "./Drawer.types";

export const Drawer = ({ ...props }: DrawerProps) => {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
};
