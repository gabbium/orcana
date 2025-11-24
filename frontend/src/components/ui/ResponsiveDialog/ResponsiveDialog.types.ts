import { type ReactElement, type ReactNode } from "react";

export type ResponsiveDialogProps = {
  title: string;
  description?: string;
  isDone: boolean;
  children: ReactNode;
  triggerButton: ReactElement;
  submitButton: ReactElement;
};
