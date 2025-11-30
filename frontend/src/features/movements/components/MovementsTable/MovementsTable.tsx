import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

import { MovementDirection, type MovementDto } from "../../api/types";

type MovementsTableProps = {
  movements: MovementDto[];
};

export const MovementsTable = ({ movements }: MovementsTableProps) => {
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
        id: "category",
        header: "Categoria",
        accessorKey: "category",
        meta: {
          hideOnMobile: true,
        },
      },
      {
        id: "direction",
        header: "Tipo",
        accessorKey: "direction",
        cell: ({ row }) => {
          if (row.original.direction === MovementDirection.Expense)
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
          const isIncome = row.original.direction === MovementDirection.Income;

          const formattedAmount = (row.original.amount / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

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
    data: movements,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    </section>
  );
};
