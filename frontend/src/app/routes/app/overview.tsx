import { createFileRoute } from "@tanstack/react-router";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item";

const OverviewPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date("2025-09-01"));

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthLabel = currentMonth
    .toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    })
    .toLowerCase();

  const balance = 2450.0;
  const totalIncome = 5000.0;
  const totalExpense = 2550.0;

  const pendingReceivable = 800.0;
  const pendingPayable = 350.0;
  const pendingReceivableCount = 2;
  const pendingPayableCount = 3;

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  const categories = [
    { icon: "🍽", name: "Alimentação", amount: 950.0, count: 12, percentage: 38 },
    { icon: "🚗", name: "Transporte", amount: 680.0, count: 8, percentage: 27 },
    { icon: "🎬", name: "Lazer", amount: 520.0, count: 5, percentage: 20 },
  ];

  return (
    <div className="flex flex-col gap-4 relative">
      {/* Seletor de Mês */}
      <div className="flex items-center justify-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          onClick={handlePreviousMonth}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Mês anterior"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>

        <div className="flex items-center gap-2 min-w-fit">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">{monthLabel}</p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={handleNextMonth}
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Próximo mês"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* FAB Mobile */}
      <FloatingActionButton icon={<PlusIcon className="w-6 h-6" />} />

      <Item variant="muted" size="sm">
        <ItemContent>
          <ItemDescription className="text-xs">Saldo do mês</ItemDescription>
          <ItemTitle className="text-base sm:text-lg">
            R$ {balance.toFixed(2).replace(".", ",")}
          </ItemTitle>
        </ItemContent>
        <ItemContent>
          <ItemDescription className="text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Receitas: R$ {totalIncome.toFixed(2).replace(".", ",")}
          </ItemDescription>
          <ItemDescription className="text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            Despesas: R$ {totalExpense.toFixed(2).replace(".", ",")}
          </ItemDescription>
        </ItemContent>
      </Item>

      <section className="flex flex-col gap-2">
        <div>
          <p className="text-xs font-medium text-foreground">Pendências</p>
        </div>
        <ItemGroup className="grid grid-cols-2 gap-3">
          <Item variant="muted" size="sm">
            <ItemContent>
              <div className="text-xs text-muted-foreground">A receber</div>
              <div className={`text-base sm:text-lg font-semibold text-green-600`}>
                {formatCurrency(pendingReceivable)}
              </div>
              <div className="text-xs text-muted-foreground">{`${pendingReceivableCount} lançamentos`}</div>
            </ItemContent>
          </Item>
          <Item variant="muted" size="sm">
            <ItemContent>
              <div className="text-xs text-muted-foreground">A pagar</div>
              <div className={`text-base sm:text-lg font-semibold text-red-600`}>
                {formatCurrency(pendingPayable)}
              </div>
              <div className="text-xs text-muted-foreground">{`${pendingPayableCount} lançamentos`}</div>
            </ItemContent>
          </Item>
        </ItemGroup>
      </section>

      <section className="flex flex-col gap-2">
        <div>
          <p className="text-xs font-medium text-foreground">Despesas por categoria</p>
        </div>
        <ItemGroup className="gap-2">
          {categories.map((category, index) => (
            <Item key={index} variant="muted" size="sm">
              <ItemMedia variant="icon">{category.icon}</ItemMedia>
              <ItemContent>
                <ItemTitle>{category.name}</ItemTitle>
                <ItemDescription className="text-xs">
                  {formatCurrency(category.amount)} em {category.count} lançamentos
                </ItemDescription>
              </ItemContent>
              <ItemContent>
                <ItemTitle>{category.percentage}%</ItemTitle>
                <ItemDescription className="text-xs text-right">do total</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/app/overview")({
  component: OverviewPage,
});
