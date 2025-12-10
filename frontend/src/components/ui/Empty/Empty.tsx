import { type ComponentProps } from "react";

import { cn } from "@/utils/cn";

import { emptyMediaVariants, type EmptyMediaVariants } from "./Empty.variants";

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

export type EmptyMediaProps = ComponentProps<"div"> & EmptyMediaVariants;

export const EmptyMedia = ({ className, variant = "default", ...props }: EmptyMediaProps) => {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant, className }))}
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

export type EmptyDescriptionProps = ComponentProps<"div">;

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
