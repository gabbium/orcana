import type { Table } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { DataTableToolbarFilter } from "../DataTableToolbarFilter/DataTableToolbarFilter";

export type DataTableToolbarSlots = {
  actions?: ReactNode;
};

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
  slots?: DataTableToolbarSlots;
};

export const DataTableToolbar = <TData,>({ table, slots }: DataTableToolbarProps<TData>) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {table
          .getAllColumns()
          .filter((col) => col.getCanFilter())
          .map((col) => (
            <DataTableToolbarFilter key={col.id} column={col} />
          ))}
      </div>
      <div className="flex items-center gap-2">{slots?.actions}</div>
    </div>
  );
};
