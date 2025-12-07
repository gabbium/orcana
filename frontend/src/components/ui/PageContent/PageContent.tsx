import type { ReactNode } from "react";

export type PageContentProps = {
  children: ReactNode;
};

export const PageContent = ({ children }: PageContentProps) => {
  return <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">{children}</div>;
};
