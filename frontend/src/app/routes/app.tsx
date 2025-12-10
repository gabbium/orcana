import { createFileRoute, Outlet, Link } from "@tanstack/react-router";

import { SiteHeader } from "@/components/layout/app/SiteHeader";
import { BottomNavigation, BottomNavigationItem } from "@/components/ui/BottomNavigation";
import { Sidebar, SidebarItem } from "@/components/ui/Sidebar";

const AppLayout = () => {
  const navItems = [
    { id: "overview", label: "Resumo", icon: "◎", path: "/app/overview" },
    { id: "transactions", label: "Transações", icon: "≡", path: "/app/transactions" },
    { id: "categories", label: "Categorias", icon: "★", path: "/app/categories" },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto px-3 pt-3 pb-0 sm:px-6 sm:pt-5">
        <SiteHeader month="Set 2025" userInitial="U" />
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-3 py-3 sm:px-6 sm:py-4 flex flex-col gap-3 sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] gap-3 sm:gap-4">
          <Sidebar>
            {navItems.map((item) => (
              <SidebarItem key={item.id} asChild>
                <Link to={item.path} activeProps={{ "data-active": true }}>
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </SidebarItem>
            ))}
          </Sidebar>
          <main className="border border-border rounded-lg p-2.5 sm:p-3.5 flex flex-col">
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <div className="p-0.5 flex flex-col gap-2">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      <BottomNavigation className="sm:hidden">
        {navItems.map((item) => (
          <BottomNavigationItem key={item.id} asChild>
            <Link to={item.path} activeProps={{ "data-active": true }}>
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </BottomNavigationItem>
        ))}
      </BottomNavigation>
    </div>
  );
};

export const Route = createFileRoute("/app")({
  component: AppLayout,
});
