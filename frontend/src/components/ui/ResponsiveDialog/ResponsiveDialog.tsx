import { type ReactElement, type ReactNode } from "react";

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
import { useMediaQuery } from "@/hooks/use-media-query";

type ResponsiveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  closeButton: ReactElement;
  submitButton: ReactElement;
};

export const ResponsiveDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  closeButton,
  submitButton,
}: ResponsiveDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
          <DialogFooter>
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
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>{closeButton}</DrawerClose>
            {submitButton}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
