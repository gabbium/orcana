import { Drawer as DrawerPrimitive } from "vaul";

import type { DrawerTriggerProps } from "./DrawerTrigger.types";

export const DrawerTrigger = ({ ...props }: DrawerTriggerProps) => {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
};
