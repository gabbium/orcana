/* eslint-disable react-refresh/only-export-components */

import { queryOptions } from "@tanstack/react-query";
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { useMemo } from "react";
import z from "zod";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import type { Movement, MovementDirection, PaginatedList } from "@/types/api";

export type ListMovementsParams = {
  pageNumber: number;
  pageSize: number;
  order?: string;
  direction?: MovementDirection[];
  minOccurredAt?: string;
  maxOccurredAt?: string;
};

export const listMovements = async (
  params: ListMovementsParams,
): Promise<PaginatedList<Movement>> => {
  console.log("Mock listMovements called with params:", params);

  return {
    items: [
      {
        id: "1",
        direction: "income",
        amount: 5000,
        description: "Salário",
        category: "Renda fixa",
        occurredAt: "2025-10-05T12:30:00Z",
      },
      {
        id: "2",
        direction: "expense",
        amount: 350,
        description: "Supermercado",
        category: "Alimentação",
        occurredAt: "2025-10-07T09:15:00Z",
      },
      {
        id: "3",
        direction: "expense",
        amount: 1800,
        description: "Aluguel",
        category: "Moradia",
        occurredAt: "2025-10-10T18:00:00Z",
      },
      {
        id: "4",
        direction: "income",
        amount: 800,
        description: "Freelance",
        category: "Renda extra",
        occurredAt: "2025-10-12T20:45:00Z",
      },
      {
        id: "5",
        direction: "expense",
        amount: 120,
        description: "Transporte",
        category: "Transporte",
        occurredAt: "2025-10-13T08:10:00Z",
      },
    ],
    pageNumber: 1,
    pageSize: 5,
    totalItems: 5,
    totalPages: 1,
    hasPreviousPage: false,
    hasNextPage: false,
  };
};

export const movementsQueries = {
  all: ["movements"],
  list: (params: ListMovementsParams) =>
    queryOptions({
      queryKey: [...movementsQueries.all, "list", params],
      queryFn: () => listMovements(params),
    }),
};

export const movementsSearchSchema = z.object({
  pageNumber: z.number().default(0),
  pageSize: z.number().default(10),
  direction: z.enum(["all", "income", "expense"]).default("all"),
});

export type MovementsSearchSchema = z.infer<typeof movementsSearchSchema>;

export const MovementsHeader = () => {
  return (
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-6 py-4">
      <h1 className="text-lg font-semibold">Movimentações</h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <TrendingDownIcon className="text-red-600" />
          Adicionar despesa
        </Button>
        <Button variant="outline" size="sm">
          <TrendingUpIcon className="text-emerald-600" />
          Adicionar receita
        </Button>
      </div>
    </header>
  );
};

type MovementsFiltersProps = {
  direction: MovementsSearchSchema["direction"];
  onDirectionChange: (direction: MovementsSearchSchema["direction"]) => void;
};

export const MovementsFilters = ({ direction, onDirectionChange }: MovementsFiltersProps) => {
  return (
    <section className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Período</span>
        <div className="flex items-center overflow-hidden rounded-md border bg-background">
          <Button variant="ghost" size="sm" className="rounded-none">
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-[120px] px-3 border-x text-center text-sm">Out 2025</div>
          <Button variant="ghost" size="sm" className="rounded-none">
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        value={direction}
        onValueChange={(value) => {
          if (!value) return;
          onDirectionChange(value as MovementsSearchSchema["direction"]);
        }}
        className="bg-background"
      >
        <ToggleGroupItem value="all">Todos</ToggleGroupItem>
        <ToggleGroupItem value="expense">Despesas</ToggleGroupItem>
        <ToggleGroupItem value="income">Receitas</ToggleGroupItem>
      </ToggleGroup>
    </section>
  );
};

export const MovementsSummary = () => {
  return (
    <section className="flex flex-col gap-2">
      <div className="text-xs text-muted-foreground">
        Resumo do período (ajustado conforme filtro selecionado)
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="flex flex-col gap-1 border-dashed px-4 py-3">
          <span className="text-xs text-muted-foreground">Receitas</span>
          <span className="text-lg font-semibold text-emerald-600">R$ 0,00</span>
          <span className="text-[11px] text-muted-foreground">Total de entradas no período</span>
        </Card>
        <Card className="flex flex-col gap-1 border-dashed px-4 py-3">
          <span className="text-xs text-muted-foreground">Despesas</span>
          <span className="text-lg font-semibold text-red-600">R$ 0,00</span>
          <span className="text-[11px] text-muted-foreground">Total de saídas no período</span>
        </Card>
        <Card className="flex flex-col gap-1 border-dashed px-4 py-3">
          <span className="text-xs text-muted-foreground">Balanço</span>
          <span className="text-lg font-semibold text-foreground">R$ 0,00</span>
          <span className="text-[11px] text-muted-foreground">Receitas - Despesas</span>
        </Card>
      </div>
    </section>
  );
};

type MovementsTableProps = {
  movements: Movement[];
};

export const MovementsTable = ({ movements }: MovementsTableProps) => {
  const columns = useMemo<ColumnDef<Movement>[]>(
    () => [
      {
        id: "date",
        header: "Data",
        accessorKey: "occurredAt",
        cell: ({ getValue }) => {
          const iso = getValue<string>();
          const date = new Date(iso);
          return date.toLocaleDateString("pt-BR");
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
        cell: ({ getValue }) => {
          const direction = getValue<string>();
          if (direction === "expense")
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
        cell: ({ getValue, row }) => {
          const amount = getValue<number>();
          const isIncome = row.original.direction === "income";

          const formatted = (amount / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

          return (
            <span
              className={["text-right", isIncome ? "text-emerald-600" : "text-red-600"].join(" ")}
            >
              {isIncome ? "+ " : "- "}
              {formatted}
            </span>
          );
        },
      },
    ],
    [],
  );

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
