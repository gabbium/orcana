import { cn } from "@/utils/cn";

import type { PageHeaderProps } from "./PageHeader.types";

export const PageHeader = ({ title, description, className, ...props }: PageHeaderProps) => {
  return (
    <div data-slot="page-header" className={cn("space-y-1", className)} {...props}>
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
};
