import { Textarea } from "@/components/ui/Textarea";
import { cn } from "@/utils/cn";

import type { InputGroupTextareaProps } from "./InputGroupTextarea.types";

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
