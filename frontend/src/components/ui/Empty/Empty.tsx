import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type EmptyProps = ComponentProps<"div">;

export const Empty = ({ className, ...props }: EmptyProps) => {
  return (
    <div
      data-slot="empty"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className,
      )}
      {...props}
    />
  );
};

export type EmptyHeaderProps = ComponentProps<"div">;

export const EmptyHeader = ({ className, ...props }: EmptyHeaderProps) => {
  return (
    <div
      data-slot="empty-header"
      className={cn("flex max-w-sm flex-col items-center gap-2 text-center", className)}
      {...props}
    />
  );
};

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted text-foreground flex size-10 shrink-0 items-center justify-center rounded-lg [&_svg:not([class*='size-'])]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type EmptyMediaProps = ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>;

export const EmptyMedia = ({ className, variant = "default", ...props }: EmptyMediaProps) => {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
};

export type EmptyTitleProps = ComponentProps<"div">;

export const EmptyTitle = ({ className, ...props }: EmptyTitleProps) => {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  );
};

export type EmptyDescriptionProps = ComponentProps<"p">;

export const EmptyDescription = ({ className, ...props }: EmptyDescriptionProps) => {
  return (
    <div
      data-slot="empty-description"
      className={cn(
        "text-muted-foreground [&>a:hover]:text-primary text-sm/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
};

export type EmptyContentProps = ComponentProps<"div">;

export const EmptyContent = ({ className, ...props }: EmptyContentProps) => {
  return (
    <div
      data-slot="empty-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className,
      )}
      {...props}
    />
  );
};
