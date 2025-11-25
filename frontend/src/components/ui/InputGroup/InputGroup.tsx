import type { ComponentProps, MouseEvent } from "react";

import { Button, type ButtonProps } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/utils/cn";

import {
  inputGroupAddonVariants,
  inputGroupButtonVariants,
  type InputGroupAddonVariants,
  type InputGroupButtonVariants,
} from "./InputGroup.variants";

export type InputGroupProps = ComponentProps<"div">;

export const InputGroup = ({ className, ...props }: InputGroupProps) => {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
        "h-9 min-w-0 has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]",
        "has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
};

export type InputGroupAddonProps = ComponentProps<"div"> & InputGroupAddonVariants;

export const InputGroupAddon = ({
  className,
  align = "inline-start",
  ...props
}: InputGroupAddonProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    e.currentTarget.parentElement?.querySelector("input")?.focus();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={handleClick}
      {...props}
    />
  );
};

export type InputGroupButtonProps = Omit<ButtonProps, "size"> & InputGroupButtonVariants;

export const InputGroupButton = ({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: InputGroupButtonProps) => {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
};

export type InputGroupTextProps = ComponentProps<"span">;

export const InputGroupText = ({ className, ...props }: InputGroupTextProps) => {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
};

export type InputGroupInputProps = ComponentProps<"input">;

export const InputGroupInput = ({ className, ...props }: InputGroupInputProps) => {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
};

export type InputGroupTextareaProps = ComponentProps<"textarea">;

export const InputGroupTextarea = ({ className, ...props }: InputGroupTextareaProps) => {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  );
};
