import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { type ComponentProps } from "react";

export type DropdownMenuItemProps = ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};
