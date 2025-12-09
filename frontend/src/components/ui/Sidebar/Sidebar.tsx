import { Slot } from "@radix-ui/react-slot";
import { type ComponentProps } from "react";

import { cn } from "@/utils/cn";

export type SidebarProps = ComponentProps<"aside"> & {
  title?: string;
};

export const Sidebar = ({ title = "Navegação", children, className, ...props }: SidebarProps) => {
  return (
    <aside
      data-slot="sidebar"
      className={cn("hidden sm:flex flex-col gap-2", className)}
      {...props}
    >
      <div className="bg-background border border-border rounded-lg p-2.5 sm:p-3.5 shadow-sm">
        {title && (
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
            {title}
          </div>
        )}
        <nav className="flex flex-col gap-1">{children}</nav>
      </div>
    </aside>
  );
};

export type SidebarItemProps = ComponentProps<"button"> & {
  asChild?: boolean;
};

export const SidebarItem = ({ asChild = false, className, ...props }: SidebarItemProps) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="sidebar-item"
      className={cn(
        "px-2 py-1.5 rounded-md text-sm",
        "flex items-center gap-2",
        "transition-colors duration-200",
        "text-muted-foreground hover:bg-muted",
        "data-[active=true]:bg-muted data-[active=true]:text-foreground data-[active=true]:font-medium",
        className,
      )}
      {...props}
    />
  );
};
