import type { FC } from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/utils/cn";

export const Drawer: FC<React.ComponentProps<typeof DrawerPrimitive.Root>> = ({ ...props }) => (
  <DrawerPrimitive.Root data-slot="drawer" {...props} />
);

export const DrawerTrigger: FC<React.ComponentProps<typeof DrawerPrimitive.Trigger>> = ({
  ...props
}) => <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;

export const DrawerPortal: FC<React.ComponentProps<typeof DrawerPrimitive.Portal>> = ({
  ...props
}) => <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;

export const DrawerClose: FC<React.ComponentProps<typeof DrawerPrimitive.Close>> = ({
  ...props
}) => <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;

export const DrawerOverlay: FC<React.ComponentProps<typeof DrawerPrimitive.Overlay>> = ({
  className,
  ...props
}) => (
  <DrawerPrimitive.Overlay
    data-slot="drawer-overlay"
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
      className,
    )}
    {...props}
  />
);

export const DrawerContent: FC<React.ComponentProps<typeof DrawerPrimitive.Content>> = ({
  className,
  children,
  ...props
}) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      data-slot="drawer-content"
      className={cn(
        "group/drawer-content bg-background fixed z-50 flex h-auto flex-col",
        "data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b",
        "data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t",
        "data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm",
        "data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm",
        className,
      )}
      {...props}
    >
      <div className="bg-muted mx-auto mt-4 hidden h-2 w-[100px] shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);

export const DrawerHeader: FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    data-slot="drawer-header"
    className={cn(
      "flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-1.5 md:text-left",
      className,
    )}
    {...props}
  />
);

export const DrawerFooter: FC<React.ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    data-slot="drawer-footer"
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);

export const DrawerTitle: FC<React.ComponentProps<typeof DrawerPrimitive.Title>> = ({
  className,
  ...props
}) => (
  <DrawerPrimitive.Title
    data-slot="drawer-title"
    className={cn("text-foreground font-semibold", className)}
    {...props}
  />
);

export const DrawerDescription: FC<React.ComponentProps<typeof DrawerPrimitive.Description>> = ({
  className,
  ...props
}) => (
  <DrawerPrimitive.Description
    data-slot="drawer-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
);
