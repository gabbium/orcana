import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

import type { InputGroupButtonProps } from "./InputGroupButton.types";
import { inputGroupButtonVariants } from "./InputGroupButton.variants";

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
