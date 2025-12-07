import type { RowData } from "@tanstack/react-table";

import type { FilterMeta } from "../components/compound/DataTable/DataTableToolbarFilter/DataTableToolbarFilter";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filter?: FilterMeta;
    hideOnMobile?: boolean;
    label?: string;
  }

  interface FilterFns {
    arrIncludesEquals: FilterFn<unknown>;
  }
}
