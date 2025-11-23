import type { Column } from "@tanstack/react-table";

export type DataTableToolbarFilterProps<TData> = {
  column: Column<TData>;
};

export type TextFilterMeta = {
  type: "text";
  title?: string;
};

export type SelectFilterMeta = {
  type: "select";
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export type FilterMeta = TextFilterMeta | SelectFilterMeta;
