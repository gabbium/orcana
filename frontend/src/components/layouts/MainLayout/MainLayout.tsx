import { Link } from "@tanstack/react-router";
import {
  LayoutDashboardIcon,
  ArrowLeftRightIcon,
  SettingsIcon,
  TagsIcon,
  WandIcon,
  HelpCircleIcon,
  WalletIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/Sidebar";

import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";
import { SiteHeader } from "./SiteHeader";
import type { NavItem } from "./types";

const data: Record<string, NavItem[]> = {
  navMain: [
    {
      title: "Dashboard",
      to: "/app/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Transações",
      icon: ArrowLeftRightIcon,
    },
    {
      title: "Categorias",
      icon: TagsIcon,
      to: "/app/categories",
    },
    {
      title: "Assistente",
      icon: WandIcon,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      icon: SettingsIcon,
    },
    {
      title: "Ajuda & suporte",
      icon: HelpCircleIcon,
    },
  ],
};

export type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as CSSProperties
      }
    >
      <Sidebar variant="inset" collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                <Link to="/app/dashboard">
                  <WalletIcon className="size-5!" />
                  <span className="text-base font-semibold">Orcana</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser
            user={{
              name: "shadcn",
              email: "m@example.com",
              avatar: "/avatars/shadcn.jpg",
            }}
          />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
