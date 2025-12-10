import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/utils/cn";

export type FloatingActionButtonProps = ComponentProps<"button"> & {
  icon?: ReactNode;
};

export const FloatingActionButton = ({
  className,
  icon,
  children,
  ...props
}: FloatingActionButtonProps) => (
  <button
    className={cn(
      "sm:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full",
      "bg-primary text-primary-foreground",
      "flex items-center justify-center",
      "shadow-[0_10px_20px_rgba(37,99,235,0.4)]",
      "hover:shadow-[0_12px_24px_rgba(37,99,235,0.5)] transition-shadow",
      "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      className,
    )}
    {...props}
  >
    {icon || children}
  </button>
);

FloatingActionButton.displayName = "FloatingActionButton";
