import type { Table } from "@tanstack/react-table";

import { DataTableToolbarFilter } from "../DataTableToolbarFilter";
import { DataTableViewOptions } from "../DataTableViewOptions";

export type DataTableToolbarProps<TData> = {
  table: Table<TData>;
};

export const DataTableToolbar = <TData,>({ table }: DataTableToolbarProps<TData>) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table
          .getAllColumns()
          .filter((col) => col.getCanFilter())
          .map((col) => (
            <DataTableToolbarFilter key={col.id} column={col} />
          ))}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};
