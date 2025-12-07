import type { LinkProps } from "@tanstack/react-router";
import type { ComponentType } from "react";

export type NavItem = LinkProps & {
  title: string;
  icon?: ComponentType<{ className?: string }>;
};
