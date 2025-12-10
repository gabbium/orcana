import { Link } from "@tanstack/react-router";

import { BottomNavigation, BottomNavigationItem } from "@/components/ui/BottomNavigation";

import type { NavItem } from "../constants";

export type AppBottomNavigationProps = {
  items: NavItem[];
};

export const AppBottomNavigation = ({ items }: AppBottomNavigationProps) => {
  return (
    <BottomNavigation className="sm:hidden">
      {items.map((item) => (
        <BottomNavigationItem key={item.id} asChild>
          <Link to={item.path} activeProps={{ "data-active": true }}>
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        </BottomNavigationItem>
      ))}
    </BottomNavigation>
  );
};
