import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";

import type { InputGroupInputProps } from "./InputGroupInput.types";

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
