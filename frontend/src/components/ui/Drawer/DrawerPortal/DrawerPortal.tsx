import { Drawer as DrawerPrimitive } from "vaul";

import type { DrawerPortalProps } from "./DrawerPortal.types";

export const DrawerPortal = ({ ...props }: DrawerPortalProps) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
};
