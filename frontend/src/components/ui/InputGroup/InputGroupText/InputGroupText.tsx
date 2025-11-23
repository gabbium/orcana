import { cn } from "@/utils/cn";

import type { InputGroupTextProps } from "./InputGroupText.types";

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
