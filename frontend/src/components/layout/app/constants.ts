import type { LinkProps } from "@tanstack/react-router";

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  path: LinkProps["to"];
};

export const navItems: NavItem[] = [
  { id: "overview", label: "Resumo", icon: "◎", path: "/app/overview" },
  { id: "transactions", label: "Transações", icon: "≡", path: "/app/transactions" },
  { id: "categories", label: "Categorias", icon: "★", path: "/app/categories" },
];
