import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

import {
  bottomNavigationButtonVariants,
  type BottomNavigationButtonVariants,
} from "./BottomNavigation.variants";

export type BottomNavigationProps = ComponentProps<"nav">;

export const BottomNavigation = ({ className, ...props }: BottomNavigationProps) => {
  return (
    <nav
      data-slot="bottom-navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 border-t flex items-center justify-around p-1 bg-background",
        className,
      )}
      {...props}
    />
  );
};

export type BottomNavigationButtonProps = ComponentProps<"button"> & {
  isActive?: boolean;
  asChild?: boolean;
} & BottomNavigationButtonVariants;

export const BottomNavigationButton = ({
  isActive = false,
  asChild = false,
  variant = "default",
  className,
  ...props
}: BottomNavigationButtonProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="bottom-navigation-button"
      data-active={isActive}
      className={cn(bottomNavigationButtonVariants({ variant }), className)}
      {...props}
    />
  );
};
