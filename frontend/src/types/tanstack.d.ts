import type { RowData } from "@tanstack/react-table";

import type { FilterMeta, ViewOptionsMeta } from "@/components/ui/DataTable";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filter?: FilterMeta;
    viewOptions?: ViewOptionsMeta;
  }
}
