import { BriefcaseIcon, DollarSignIcon, HomeIcon, ShoppingCartIcon } from "lucide-react";

import type { CategoryKind, CategoryStatus } from "../api/types";

export const CATEGORY_KIND_OPTIONS = [
  {
    label: "Despesa",
    value: "expense" as const,
  },
  {
    label: "Receita",
    value: "income" as const,
  },
] satisfies Array<{ label: string; value: CategoryKind }>;

export const CATEGORY_STATUS_OPTIONS = [
  {
    label: "Ativo",
    value: "active" as const,
  },
  {
    label: "Inativo",
    value: "inactive" as const,
  },
] satisfies Array<{ label: string; value: CategoryStatus }>;

export const CATEGORY_ICON_MAP = {
  "dollar-sign": DollarSignIcon,
  home: HomeIcon,
  briefcase: BriefcaseIcon,
  "shopping-cart": ShoppingCartIcon,
} as const;

export const CATEGORY_COLOR_MAP: Record<string, string> = {
  green: "text-green-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
};
