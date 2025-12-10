import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AppBottomNavigation, AppHeader, AppSidebar, navItems } from "@/components/layout/app";

const AppLayout = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto px-3 pt-3 pb-0 sm:px-6 sm:pt-5">
        <AppHeader month="Set 2025" />
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-3 py-3 sm:px-6 sm:py-4 flex flex-col gap-3 sm:gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)] gap-3 sm:gap-4">
          <AppSidebar items={navItems} />
          <main className="border border-border rounded-lg p-2.5 sm:p-3.5 flex flex-col">
            <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              <div className="p-0.5 flex flex-col gap-2">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
      <AppBottomNavigation items={navItems} />
    </div>
  );
};

export const Route = createFileRoute("/app")({
  component: AppLayout,
});
