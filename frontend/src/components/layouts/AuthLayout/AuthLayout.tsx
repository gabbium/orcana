import type { AuthLayoutProps } from "./AuthLayout.types";

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
};
