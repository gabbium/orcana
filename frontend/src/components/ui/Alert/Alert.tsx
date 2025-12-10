import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

import { alertVariants, type AlertVariants } from "./Alert.variants";

export type AlertProps = ComponentProps<"div"> & AlertVariants;

export const Alert = ({ className, variant, ...props }: AlertProps) => {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
};

export type AlertTitleProps = ComponentProps<"div">;

export const AlertTitle = ({ className, ...props }: AlertTitleProps) => {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
      {...props}
    />
  );
};

export type AlertDescriptionProps = ComponentProps<"div">;

export const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
};
