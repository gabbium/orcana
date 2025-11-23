import * as DialogPrimitive from "@radix-ui/react-dialog";
import { type ComponentProps } from "react";

export type DialogContentProps = ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
};
