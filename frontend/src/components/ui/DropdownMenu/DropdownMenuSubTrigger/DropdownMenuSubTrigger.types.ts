import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { type ComponentProps } from "react";

export type DropdownMenuSubTriggerProps = ComponentProps<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};
