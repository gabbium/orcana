import type { FC, PropsWithChildren } from "react";

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
};
