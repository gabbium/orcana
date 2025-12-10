import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type BottomNavigationProps = ComponentProps<"div">;

export const BottomNavigation = ({ children, className, ...props }: BottomNavigationProps) => {
  return (
    <div
      data-slot="bottom-navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 px-3 py-2 pb-2.5",
        "bg-linear-to-t from-background to-transparent",
        className,
      )}
      {...props}
    >
      <nav
        className={cn(
          "mx-auto max-w-[480px]",
          "rounded-lg bg-card border border-border shadow-sm",
          "p-1 flex items-center justify-between gap-1",
        )}
      >
        {children}
      </nav>
    </div>
  );
};

export type BottomNavigationItemProps = ComponentProps<"button"> & {
  asChild?: boolean;
};

export const BottomNavigationItem = ({
  asChild = false,
  className,
  ...props
}: BottomNavigationItemProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="bottom-navigation-item"
      className={cn(
        "flex-1 rounded-lg px-1 py-1.5",
        "text-xs font-medium",
        "flex flex-col items-center gap-0.5",
        "transition-colors duration-200",
        "text-muted-foreground hover:bg-muted/50",
        "data-[active=true]:bg-muted data-[active=true]:text-foreground",
        className,
      )}
      {...props}
    />
  );
};
