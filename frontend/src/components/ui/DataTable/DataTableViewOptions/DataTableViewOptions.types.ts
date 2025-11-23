import type { Table } from "@tanstack/react-table";

export type DataTableViewOptionsProps<TData> = {
  table: Table<TData>;
};

export type ViewOptionsMeta = {
  title?: string;
};
