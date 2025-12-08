import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type BreadcrumbProps = ComponentProps<"nav">;

export const Breadcrumb = ({ ...props }: BreadcrumbProps) => {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
};

export type BreadcrumbListProps = ComponentProps<"ol">;

export const BreadcrumbList = ({ className, ...props }: BreadcrumbListProps) => {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className,
      )}
      {...props}
    />
  );
};

export type BreadcrumbItemProps = ComponentProps<"li">;

export const BreadcrumbItem = ({ className, ...props }: BreadcrumbItemProps) => {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
};

export type BreadcrumbLinkProps = ComponentProps<"a"> & {
  asChild?: boolean;
};

export const BreadcrumbLink = ({ asChild, className, ...props }: BreadcrumbLinkProps) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
};

export type BreadcrumbPageProps = ComponentProps<"span">;

export const BreadcrumbPage = ({ className, ...props }: BreadcrumbPageProps) => {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
};

export type BreadcrumbSeparatorProps = ComponentProps<"li">;

export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
};

export type BreadcrumbEllipsisProps = ComponentProps<"span">;

export const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
};
