import {
  CalendarRangeIcon,
  ChartPieIcon,
  FileTextIcon,
  FolderKanbanIcon,
  HouseIcon,
  InfoIcon,
  LogsIcon,
  PlusIcon,
  ScaleIcon,
  TagIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label?: string;
  items: NavItem[];
};

export const NAV_OVERVIEW_GROUP: NavGroup = {
  items: [
    {
      title: "Principal",
      url: "/app/home",
      icon: HouseIcon,
    },
    {
      title: "Transações",
      url: "/app/transactions",
      icon: LogsIcon,
    },
    {
      title: "Planejamento",
      url: "/app/planning",
      icon: CalendarRangeIcon,
    },
  ],
};

export const NAV_MANAGE_GROUP: NavGroup = {
  label: "Gerenciar",
  items: [
    {
      title: "Categorias",
      url: "/app/categories",
      icon: FolderKanbanIcon,
    },
    {
      title: "Tags",
      url: "/app/tags",
      icon: TagIcon,
    },
  ],
};

export const NAV_GENERAL_GROUP: NavGroup = {
  label: "Geral",
  items: [
    {
      title: "Gráficos",
      url: "/app/charts",
      icon: ChartPieIcon,
    },
    {
      title: "Balanço mensal",
      url: "/app/monthly-balance",
      icon: ScaleIcon,
    },
  ],
};

export const NAV_ABOUT_GROUP: NavGroup = {
  label: "Sobre",
  items: [
    {
      title: "Termos de Uso",
      url: "/app/terms-of-service",
      icon: FileTextIcon,
    },
    {
      title: "Sobre",
      url: "/app/about",
      icon: InfoIcon,
    },
  ],
};

export const NAV_LOGO = {
  title: "Orcana Inc.",
  url: "/app/home",
  icon: WalletIcon,
};

export const NAV_QUICK_ACTION = {
  title: "Ação Rápida",
  url: "#",
  icon: PlusIcon,
};
