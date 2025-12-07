import {
  BriefcaseIcon,
  DollarSignIcon,
  HomeIcon,
  ShoppingCartIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  type LucideIcon,
} from "lucide-react";

import { CATEGORY_COLOR, CATEGORY_ICON, CATEGORY_KIND, CATEGORY_STATUS } from "./enums";

export const CATEGORY_KIND_MAP: Record<
  (typeof CATEGORY_KIND)[keyof typeof CATEGORY_KIND],
  {
    label: string;
    icon: LucideIcon;
    className: string;
  }
> = {
  [CATEGORY_KIND.EXPENSE]: {
    label: "Despesa",
    icon: TrendingDownIcon,
    className: "text-red-500",
  },
  [CATEGORY_KIND.INCOME]: {
    label: "Receita",
    icon: TrendingUpIcon,
    className: "text-emerald-500",
  },
};

export const CATEGORY_KIND_OPTIONS = Object.entries(CATEGORY_KIND_MAP).map(
  ([value, { label, icon, className }]) => ({
    label,
    value,
    icon,
    className,
  }),
);

export const CATEGORY_ICON_MAP: Record<
  (typeof CATEGORY_ICON)[keyof typeof CATEGORY_ICON],
  {
    label: string;
    icon: LucideIcon;
  }
> = {
  [CATEGORY_ICON.DOLLAR_SIGN]: {
    label: "Dollar Sign",
    icon: DollarSignIcon,
  },
  [CATEGORY_ICON.HOME]: {
    label: "Home",
    icon: HomeIcon,
  },
  [CATEGORY_ICON.BRIEFCASE]: {
    label: "Briefcase",
    icon: BriefcaseIcon,
  },
  [CATEGORY_ICON.SHOPPING_CART]: {
    label: "Shopping Cart",
    icon: ShoppingCartIcon,
  },
};

export const CATEGORY_ICON_OPTIONS = Object.entries(CATEGORY_ICON_MAP).map(
  ([value, { label, icon }]) => ({
    label,
    value,
    icon,
  }),
);

export const CATEGORY_COLOR_MAP: Record<
  (typeof CATEGORY_COLOR)[keyof typeof CATEGORY_COLOR],
  {
    label: string;
    className: string;
  }
> = {
  [CATEGORY_COLOR.GREEN]: {
    label: "Verde",
    className: "text-emerald-500",
  },
  [CATEGORY_COLOR.BLUE]: {
    label: "Azul",
    className: "text-blue-500",
  },
  [CATEGORY_COLOR.PURPLE]: {
    label: "Roxo",
    className: "text-purple-500",
  },
  [CATEGORY_COLOR.ORANGE]: {
    label: "Laranja",
    className: "text-orange-500",
  },
};

export const CATEGORY_COLOR_OPTIONS = Object.entries(CATEGORY_COLOR_MAP).map(
  ([value, { label, className }]) => ({
    label,
    value,
    className,
  }),
);

export const CATEGORY_STATUS_MAP: Record<
  (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS],
  {
    label: string;
    className: string;
  }
> = {
  [CATEGORY_STATUS.ACTIVE]: {
    label: "Ativo",
    className: "text-emerald-500",
  },
  [CATEGORY_STATUS.INACTIVE]: {
    label: "Inativo",
    className: "text-slate-500",
  },
};

export const CATEGORY_STATUS_OPTIONS = Object.entries(CATEGORY_STATUS_MAP).map(
  ([value, { label, className }]) => ({
    label,
    value,
    className,
  }),
);
