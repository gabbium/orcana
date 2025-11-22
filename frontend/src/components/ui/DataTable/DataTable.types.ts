import type { ColumnFiltersState, SortingState, ColumnDef } from "@tanstack/react-table";
import type { ReactNode } from "react";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  serverSide?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
  };
  onPaginationChange?: (page: number, pageSize: number) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  toolbarActions?: ReactNode;
}
