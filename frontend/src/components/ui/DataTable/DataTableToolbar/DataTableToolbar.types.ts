import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  actions?: ReactNode;
}
