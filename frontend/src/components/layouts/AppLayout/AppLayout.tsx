import type { AppLayoutProps } from "./AppLayout.types";

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
};
