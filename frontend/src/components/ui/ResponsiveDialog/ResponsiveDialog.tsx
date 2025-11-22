import { useEffect, type FC, type ReactElement, type ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../Drawer";
import { Button } from "../Button";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";

type ResponsiveDialogProps = {
  title: string;
  description?: string;
  isDone: boolean;
  children: ReactNode;
  triggerButton: ReactElement;
};

export const ResponsiveDialog: FC<ResponsiveDialogProps> = ({
  title,
  description,
  children,
  isDone,
  triggerButton,
}) => {
  const { close, open, isOpen } = useDisclosure();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  if (isDesktop) {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            close();
          } else {
            open();
          }
        }}
      >
        <DialogTrigger asChild>{triggerButton}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          close();
        } else {
          open();
        }
      }}
    >
      <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className="px-4">{children}</div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
