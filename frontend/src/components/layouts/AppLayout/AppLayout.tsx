import type { AppLayoutProps } from "./AppLayout.types";

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6">{children}</main>
    </div>
  );
};
