import type { ComponentProps, ReactNode } from "react";

export type PageHeaderProps = ComponentProps<"div"> & {
  title: string;
  description?: ReactNode;
};
