import { type DialogProps } from "@/components/ui/Dialog";

export type CommandDialogProps = DialogProps & {
  title?: string;
  description?: string;
  className?: string;
  showCloseButton?: boolean;
};
