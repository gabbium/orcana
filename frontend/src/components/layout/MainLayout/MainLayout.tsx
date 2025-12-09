import { Link } from "@tanstack/react-router";
import { MoreHorizontalIcon } from "lucide-react";
import type { ReactNode } from "react";

import { BottomNavigation, BottomNavigationButton } from "@/components/ui/BottomNavigation";
import { Button } from "@/components/ui/Button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  NAV_LOGO,
  NAV_QUICK_ACTION,
  NAV_OVERVIEW_GROUP,
  NAV_GENERAL_GROUP,
  NAV_ABOUT_GROUP,
  NAV_MANAGE_GROUP,
} from "./MainLayout.constants";

export type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    const home = NAV_OVERVIEW_GROUP.items[0];
    const transactions = NAV_OVERVIEW_GROUP.items[1];
    const planning = NAV_OVERVIEW_GROUP.items[2];

    return (
      <div className="flex flex-col min-h-screen">
        {children}
        <BottomNavigation>
          <BottomNavigationButton asChild>
            <Link
              to={home.url}
              activeProps={{
                "data-active": true,
              }}
            >
              <home.icon />
              <span>{home.title}</span>
            </Link>
          </BottomNavigationButton>
          <BottomNavigationButton asChild>
            <Link
              to={transactions.url}
              activeProps={{
                "data-active": true,
              }}
            >
              <transactions.icon />
              <span>{transactions.title}</span>
            </Link>
          </BottomNavigationButton>
          <Button
            className="h-14 w-14 rounded-full bg-primary p-0 hover:bg-primary/90 -mt-10"
            size="icon"
          >
            <NAV_QUICK_ACTION.icon className="size-7" />
          </Button>
          <BottomNavigationButton asChild>
            <Link
              to={planning.url}
              activeProps={{
                "data-active": true,
              }}
            >
              <planning.icon />
              <span>{planning.title}</span>
            </Link>
          </BottomNavigationButton>
          <BottomNavigationButton asChild>
            <Link
              to="/app/more"
              activeProps={{
                "data-active": true,
              }}
            >
              <MoreHorizontalIcon />
              <span>Mais</span>
            </Link>
          </BottomNavigationButton>
        </BottomNavigation>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <NAV_LOGO.icon className="size-5" />
            <span className="text-base font-semibold">{NAV_LOGO.title}</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={NAV_QUICK_ACTION.title}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  >
                    <NAV_QUICK_ACTION.icon />
                    <span>{NAV_QUICK_ACTION.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <SidebarMenu>
                {NAV_OVERVIEW_GROUP.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <Link
                        to={item.url}
                        activeProps={{
                          "data-active": true,
                        }}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {[NAV_MANAGE_GROUP, NAV_GENERAL_GROUP, NAV_ABOUT_GROUP].map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.url}
                          activeProps={{
                            "data-active": true,
                          }}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
      {children}
    </SidebarProvider>
  );
};
