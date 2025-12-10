import * as React from "react";

import { cn } from "@/utils/cn";

export interface FloatingActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(({ className, icon, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "sm:hidden fixed bottom-20 right-4 w-14 h-14 rounded-full",
      "bg-primary text-primary-foreground",
      "flex items-center justify-center",
      "shadow-[0_10px_20px_rgba(37,99,235,0.4)]",
      "hover:shadow-[0_12px_24px_rgba(37,99,235,0.5)] transition-shadow",
      "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  >
    {icon || children}
  </button>
));

FloatingActionButton.displayName = "FloatingActionButton";
