import type { Table } from "@tanstack/react-table";

import { DataTableToolbarFilter } from "../DataTableToolbarFilter/DataTableToolbarFilter";

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export const DataTableToolbar = <TData,>({ table }: DataTableToolbarProps<TData>) => {
  return (
    <div className="flex items-center gap-2">
      {table
        .getAllColumns()
        .filter((col) => col.getCanFilter())
        .map((col) => (
          <DataTableToolbarFilter key={col.id} column={col} />
        ))}
    </div>
  );
};
