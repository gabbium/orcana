import type { AppLayoutProps } from "./AppLayout.types";

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="flex flex-1 p-4 md:px-6">
      <main className="flex flex-1 flex-col space-y-4">{children}</main>
    </div>
  );
};
