import type { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/Drawer";
import { useIsMobile } from "@/hooks/use-mobile";

export type ResponsiveDialogProps = {
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  closeButton: ReactElement;
  submitButton: ReactElement;
};

export const ResponsiveDialog = ({
  title,
  description,
  open,
  onOpenChange,
  children,
  closeButton,
  submitButton,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
          <DialogFooter className="flex flex-row justify-end">
            <DialogClose asChild>{closeButton}</DialogClose>
            {submitButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="flex max-h-dvh flex-col">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="px-4">{children}</div>
          <DrawerFooter className="flex flex-row justify-end">
            <DrawerClose asChild>{closeButton}</DrawerClose>
            {submitButton}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
