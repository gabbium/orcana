import { LayoutDashboardIcon, ShoppingBasketIcon } from "lucide-react";
import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";

import { DashboardSidebar, type DashboardSidebarMenuItem } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

export type DashboardLayoutProps = {
  children: ReactNode;
};

const SIDEBAR_ITEMS: DashboardSidebarMenuItem[] = [
  {
    label: "Dashboard",
    to: "/app/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    label: "Categorias",
    to: "/app/categories",
    icon: ShoppingBasketIcon,
  },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSidebar
        items={SIDEBAR_ITEMS}
        user={{ name: "User", email: "user@example.com", avatar: "https://github.com/shadcn.png" }}
      />
      <SidebarInset>
        <DashboardTopbar />
        <main className="flex flex-1 p-4 md:px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};
