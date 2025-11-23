import type { Column } from "@tanstack/react-table";
import type { ComponentProps } from "react";

export type DataTableColumnHeaderProps<TData, TValue> = ComponentProps<"div"> & {
  column: Column<TData, TValue>;
  title: string;
};
