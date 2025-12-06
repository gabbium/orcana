import type { Column } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "../DataTableFacetedFilter";
import { DataTableTextFilter } from "../DataTableTextFilter";

export type DataTableToolbarFilterProps<TData> = {
  column: Column<TData>;
};

export type FilterMeta =
  | {
      type: "text";
    }
  | {
      type: "select";
      options: { label: string; value: string }[];
    };

export const DataTableToolbarFilter = <TData,>({ column }: DataTableToolbarFilterProps<TData>) => {
  const filterConfig = column.columnDef.meta?.filter;

  if (!filterConfig) {
    return null;
  }

  switch (filterConfig.type) {
    case "text":
      return <DataTableTextFilter column={column} />;

    case "select":
      return <DataTableFacetedFilter column={column} />;

    default:
      return null;
  }
};
