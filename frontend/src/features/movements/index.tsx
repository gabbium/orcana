import { ChevronLeftIcon, ChevronRightIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";

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

export const MovementsFilters = () => {
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
      <ToggleGroup type="single" variant="outline" size="sm" className="bg-background">
        <ToggleGroupItem value="all">Todos</ToggleGroupItem>
        <ToggleGroupItem value="expenses">Despesas</ToggleGroupItem>
        <ToggleGroupItem value="incomes">Receitas</ToggleGroupItem>
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

export const MovementsTable = () => {
  return (
    <section className="overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center justify-between border-b px-4 py-2 text-xs text-muted-foreground">
        <span>Movimentações do período</span>
      </div>
      <Table className="text-sm">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[120px]">Data</TableHead>
            <TableHead className="w-[35%]">Descrição</TableHead>
            <TableHead className="hidden w-[20%] md:table-cell">Categoria</TableHead>
            <TableHead className="w-[90px]">Tipo</TableHead>
            <TableHead className="w-[120px] text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="hover:bg-muted/40">
            <TableCell className="w-[120px]">05/10/2025</TableCell>
            <TableCell className="w-[35%]">Salário</TableCell>
            <TableCell className="hidden w-[20%] md:table-cell">Renda fixa</TableCell>
            <TableCell className="w-[90px]">
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <TrendingUpIcon className="text-emerald-600" />
                Receita
              </Badge>
            </TableCell>
            <TableCell className="w-[120px] text-right text-emerald-600">+ R$ 5.000,00</TableCell>
          </TableRow>
          <TableRow className="hover:bg-muted/40">
            <TableCell>07/10/2025</TableCell>
            <TableCell>Supermercado</TableCell>
            <TableCell className="hidden md:table-cell">Alimentação</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <TrendingDownIcon className="text-red-600" />
                Despesa
              </Badge>
            </TableCell>
            <TableCell className="text-right text-red-600">- R$ 350,00</TableCell>
          </TableRow>
          <TableRow className="hover:bg-muted/40">
            <TableCell>10/10/2025</TableCell>
            <TableCell>Aluguel</TableCell>
            <TableCell className="hidden md:table-cell">Moradia</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <TrendingDownIcon className="text-red-600" />
                Despesa
              </Badge>
            </TableCell>
            <TableCell className="text-right text-red-600">- R$ 1.800,00</TableCell>
          </TableRow>
          <TableRow className="hover:bg-muted/40">
            <TableCell>12/10/2025</TableCell>
            <TableCell>Freelance</TableCell>
            <TableCell className="hidden md:table-cell">Renda extra</TableCell>
            <TableCell>
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <TrendingUpIcon className="text-emerald-600" />
                Receita
              </Badge>
            </TableCell>
            <TableCell className="text-right text-emerald-600">+ R$ 800,00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
};
