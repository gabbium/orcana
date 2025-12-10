import { Link } from "@tanstack/react-router";

import { Sidebar, SidebarItem } from "@/components/ui/Sidebar";

import type { NavItem } from "../constants";

export type AppSidebarProps = {
  items: NavItem[];
};

export const AppSidebar = ({ items }: AppSidebarProps) => {
  return (
    <Sidebar>
      {items.map((item) => (
        <SidebarItem key={item.id} asChild>
          <Link to={item.path} activeProps={{ "data-active": true }}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        </SidebarItem>
      ))}
    </Sidebar>
  );
};
