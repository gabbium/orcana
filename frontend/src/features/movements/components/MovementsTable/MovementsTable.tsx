import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import type { PaginatedList } from "@/types/api";

import { type MovementDto } from "../../api/types";

type MovementsTableProps = {
  movements: PaginatedList<MovementDto>;
  onPaginationChange: (pageNumber: number, pageSize: number) => void;
};

export const MovementsTable = ({ movements, onPaginationChange }: MovementsTableProps) => {
  const columns = useMemo<ColumnDef<MovementDto>[]>(
    () => [
      {
        id: "date",
        header: "Data",
        accessorKey: "occurredAt",
        cell: ({ row }) => {
          const formattedOccurredAt = new Date(row.original.occurredAt);
          return formattedOccurredAt.toLocaleDateString("pt-BR");
        },
      },
      {
        id: "description",
        header: "Descrição",
        accessorKey: "description",
      },
      {
        id: "direction",
        header: "Tipo",
        accessorKey: "direction",
        cell: ({ row }) => {
          if (row.original.direction === "Expense")
            return (
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <TrendingDownIcon className="text-red-600" />
                Despesa
              </Badge>
            );

          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              <TrendingUpIcon className="text-emerald-600" />
              Receita
            </Badge>
          );
        },
      },
      {
        id: "amount",
        header: "Valor",
        accessorKey: "amount",
        cell: ({ row }) => {
          const isIncome = row.original.direction === "Income";

          const formattedAmount = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          }).format(row.original.amount);

          return (
            <span
              className={["text-right", isIncome ? "text-emerald-600" : "text-red-600"].join(" ")}
            >
              {isIncome ? "+ " : "- "}
              {formattedAmount}
            </span>
          );
        },
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: movements.items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination: {
        pageIndex: movements.pageNumber - 1,
        pageSize: movements.pageSize,
      },
    },
    manualPagination: true,
    pageCount: movements.totalPages,
    rowCount: movements.totalItems,
    onPaginationChange: (updater) => {
      const next = typeof updater === "function" ? updater(table.getState().pagination) : updater;
      onPaginationChange(next.pageIndex + 1, next.pageSize);
    },
  });

  return (
    <section className="overflow-hidden rounded-md border bg-background">
      <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground">
        <span>Movimentações do período</span>
      </div>
      <Table className="text-sm">
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const hideOnMobile = header.column.columnDef.meta?.hideOnMobile;
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={hideOnMobile ? "hidden md:table-cell" : undefined}
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
              <TableRow key={row.id} className="hover:bg-muted/40">
                {row.getVisibleCells().map((cell) => {
                  const hideOnMobile = cell.column.columnDef.meta?.hideOnMobile;
                  return (
                    <TableCell
                      key={cell.id}
                      className={hideOnMobile ? "hidden md:table-cell" : undefined}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="py-6 text-center text-sm text-muted-foreground"
              >
                Nenhuma movimentação encontrada para o período e filtros selecionados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end border-t px-4 py-2 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2 lg:space-x-8">
          <div className="hidden sm:flex items-center space-x-2">
            <p className="text-sm font-medium">Linhas por página</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para a primeira página</span>
              <ChevronsLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Ir para a página anterior</span>
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir para a próxima página</span>
              <ChevronRightIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Ir para a última página</span>
              <ChevronsRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
