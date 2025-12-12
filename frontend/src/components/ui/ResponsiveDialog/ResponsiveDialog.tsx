import { useEffect, type ReactElement, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useIsMobile } from "@/hooks/use-mobile";

export type ResponsiveDialogProps = {
  title: string;
  isDone: boolean;
  triggerButton: ReactElement;
  submitButton: ReactElement;
  children: ReactNode;
  onClose?: () => void;
};

export const ResponsiveDialog = ({
  title,
  isDone,
  triggerButton,
  submitButton,
  children,
  onClose,
}: ResponsiveDialogProps) => {
  const { close, open, isOpen } = useDisclosure();
  const isMobile = useIsMobile();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      close();
      onClose?.();
    } else {
      open();
    }
  };

  useEffect(() => {
    if (isDone) {
      close();
      onClose?.();
    }
  }, [isDone, close, onClose]);

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
          <DialogFooter className="flex flex-row justify-end">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            {submitButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent className="flex max-h-dvh flex-col">
        <div className="flex-1 overflow-y-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4">{children}</div>
          <DrawerFooter className="flex flex-row justify-end">
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
            {submitButton}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
