import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { DataTablePagination } from "../DataTablePagination";
import { DataTableToolbar } from "../DataTableToolbar";

export type DataTableBaseProps<TData> = {
  serverSide?: boolean;
  data: TData[];
  pageCount: number;
  pagination: PaginationState;
  columnFilters: ColumnFiltersState;
  onPaginationChange: (pagination: PaginationState) => void;
  onColumnFiltersChange: (columnFilters: ColumnFiltersState) => void;
};

export type DataTableProps<TData, TValue> = DataTableBaseProps<TData> & {
  columns: ColumnDef<TData, TValue>[];
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  serverSide = false,
  pageCount,
  pagination,
  onPaginationChange,
  columnFilters,
  onColumnFiltersChange,
}: DataTableProps<TData, TValue>) => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
    },
    pageCount,
    manualPagination: serverSide,
    manualFiltering: serverSide,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(table.getState().pagination) : updater;
      onPaginationChange(next);
    },
    onColumnFiltersChange: (updaterOrValue) => {
      const newValue =
        typeof updaterOrValue === "function" ? updaterOrValue(columnFilters) : updaterOrValue;
      onColumnFiltersChange(newValue);
    },
    filterFns: {
      arrIncludesEquals: (row, columnId, filterValue) => {
        return filterValue.includes(row.getValue(columnId));
      },
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className="text-muted-foreground px-2"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter className="bg-background">
            <TableRow>
              <TableCell colSpan={columns.length}>
                <DataTablePagination table={table} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
