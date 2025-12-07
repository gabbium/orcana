import type { ComponentType } from "react";

export type NavItem = {
  title: string;
  url: string;
  icon?: ComponentType<{ className?: string }>;
};
