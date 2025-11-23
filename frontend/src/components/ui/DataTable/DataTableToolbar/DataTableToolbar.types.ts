import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  actions?: ReactNode;
};
