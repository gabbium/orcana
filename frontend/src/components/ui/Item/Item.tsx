import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { Separator } from "@/components/ui/Separator";
import { cn } from "@/utils/cn";

import {
  itemVariants,
  itemMediaVariants,
  type ItemVariants,
  type ItemMediaVariants,
} from "./Item.variants";

export type ItemGroupProps = ComponentProps<"div">;

export const ItemGroup = ({ className, ...props }: ItemGroupProps) => {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  );
};

export type ItemSeparatorProps = ComponentProps<typeof Separator>;

export const ItemSeparator = ({ className, ...props }: ItemSeparatorProps) => {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  );
};

export type ItemProps = ComponentProps<"div"> & ItemVariants & { asChild?: boolean };

export const Item = ({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ItemProps) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
};

export type ItemMediaProps = ComponentProps<"div"> & ItemMediaVariants;

export const ItemMedia = ({ className, variant = "default", ...props }: ItemMediaProps) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
};

export type ItemContentProps = ComponentProps<"div">;

export const ItemContent = ({ className, ...props }: ItemContentProps) => {
  return (
    <div
      data-slot="item-content"
      className={cn("flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none", className)}
      {...props}
    />
  );
};

export type ItemTitleProps = ComponentProps<"div">;

export const ItemTitle = ({ className, ...props }: ItemTitleProps) => {
  return (
    <div
      data-slot="item-title"
      className={cn("flex w-fit items-center gap-2 text-sm leading-snug font-medium", className)}
      {...props}
    />
  );
};

export type ItemDescriptionProps = ComponentProps<"p">;

export const ItemDescription = ({ className, ...props }: ItemDescriptionProps) => {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance",
        "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
};

export type ItemActionsProps = ComponentProps<"div">;

export const ItemActions = ({ className, ...props }: ItemActionsProps) => {
  return (
    <div data-slot="item-actions" className={cn("flex items-center gap-2", className)} {...props} />
  );
};

export type ItemHeaderProps = ComponentProps<"div">;

export const ItemHeader = ({ className, ...props }: ItemHeaderProps) => {
  return (
    <div
      data-slot="item-header"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
};

export type ItemFooterProps = ComponentProps<"div">;

export const ItemFooter = ({ className, ...props }: ItemFooterProps) => {
  return (
    <div
      data-slot="item-footer"
      className={cn("flex basis-full items-center justify-between gap-2", className)}
      {...props}
    />
  );
};
