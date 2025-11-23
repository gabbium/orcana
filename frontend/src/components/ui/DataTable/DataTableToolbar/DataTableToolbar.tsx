import { DataTableToolbarFilter } from "../DataTableToolbarFilter";
import { DataTableViewOptions } from "../DataTableViewOptions";

import type { DataTableToolbarProps } from "./DataTableToolbar.types";

export const DataTableToolbar = <TData,>({ table, actions }: DataTableToolbarProps<TData>) => {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {table
          .getAllColumns()
          .filter((col) => col.columnDef.meta?.filter)
          .map((col) => (
            <DataTableToolbarFilter key={col.id} column={col} />
          ))}
      </div>
      <div className="flex items-center gap-2 md:justify-end">
        <DataTableViewOptions table={table} />
        {actions}
      </div>
    </div>
  );
};
