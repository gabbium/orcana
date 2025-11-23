import { type ComponentProps } from "react";

import { Dialog } from "@/components/ui/Dialog";

export type CommandDialogProps = ComponentProps<typeof Dialog> & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
};
