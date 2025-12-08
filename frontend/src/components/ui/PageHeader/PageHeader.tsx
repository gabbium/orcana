import { type ReactNode } from "react";

export type PageHeaderProps = {
  title: string;
  action?: ReactNode;
};

export const PageHeader = ({ title, action }: PageHeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </header>
  );
};
