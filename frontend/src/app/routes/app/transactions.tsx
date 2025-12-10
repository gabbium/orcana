import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ChevronLeft, ChevronRight, MoreVertical, Plus } from "lucide-react";
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
import { cn } from "@/utils/cn";

interface Transaction {
  id: string;
  icon: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  status: "confirmed" | "pending";
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  {
    id: "1",
    icon: "🍽",
    title: "Almoço restaurante",
    category: "Alimentação",
    date: "10 set",
    amount: 45.0,
    status: "confirmed",
    type: "expense",
  },
  {
    id: "2",
    icon: "💼",
    title: "Freelancer UI",
    category: "Trabalho extra",
    date: "15 set",
    amount: 800.0,
    status: "pending",
    type: "income",
  },
  {
    id: "3",
    icon: "💡",
    title: "Conta de luz",
    category: "Moradia",
    date: "20 set",
    amount: 230.0,
    status: "pending",
    type: "expense",
  },
  {
    id: "4",
    icon: "🏠",
    title: "Aluguel",
    category: "Moradia",
    date: "01 set",
    amount: 1200.0,
    status: "confirmed",
    type: "expense",
  },
  {
    id: "5",
    icon: "💰",
    title: "Salário",
    category: "Receita",
    date: "05 set",
    amount: 5000.0,
    status: "confirmed",
    type: "income",
  },
];

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isExpense = transaction.type === "expense";
  const amountColor = isExpense ? "text-red-600" : "text-green-600";

  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">{transaction.icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{transaction.title}</ItemTitle>
        <ItemDescription className="text-xs">
          {transaction.category} • {transaction.date}
        </ItemDescription>
      </ItemContent>
      <ItemContent>
        <ItemTitle className={amountColor}>
          R$ {transaction.amount.toFixed(2).replace(".", ",")}
        </ItemTitle>
        <ItemDescription className="text-xs text-right">
          {transaction.status === "confirmed"
            ? "Pago"
            : transaction.type === "income"
              ? "A receber"
              : "A pagar"}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

const TransactionsPage = () => {
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all");
  const [currentMonth, setCurrentMonth] = useState(new Date("2025-09-01"));

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthLabel = currentMonth.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  }).toLowerCase();

  // Calcular totais do mês
  const confirmedIncome = transactions
    .filter((t) => t.type === "income" && t.status === "confirmed")
    .reduce((sum, t) => sum + t.amount, 0);

  const confirmedExpense = transactions
    .filter((t) => t.type === "expense" && t.status === "confirmed")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingIncome = transactions
    .filter((t) => t.type === "income" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const pendingExpense = transactions
    .filter((t) => t.type === "expense" && t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = confirmedIncome - confirmedExpense;
  const monthBalance = totalIncome - totalExpense;

  // Filtrar transações baseado no tipo
  const filteredTransactions = transactions.filter((t) => {
    if (filterType === "all") return true;
    return t.type === filterType;
  });

  // Determinar rótulos e valores do card resumo
  let firstLabel = "Saldo atual";
  let firstValue = currentBalance;
  let secondLabel = "Balanço do mês";
  let secondValue = monthBalance;
  let firstIsPositive = firstValue >= 0;
  let secondIsPositive = secondValue >= 0;

  if (filterType === "expense") {
    firstLabel = "Total pago";
    firstValue = confirmedExpense;
    firstIsPositive = false; // Despesa paga é ruim (vermelho)
    secondLabel = "Total pendente";
    secondValue = pendingExpense;
    secondIsPositive = true; // Despesa pendente é melhor (verde)
  } else if (filterType === "income") {
    firstLabel = "Total recebido";
    firstValue = confirmedIncome;
    firstIsPositive = true; // Receita recebida é bom (verde)
    secondLabel = "Total pendente";
    secondValue = pendingIncome;
    secondIsPositive = false; // Receita pendente é ruim (vermelho)
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {/* Toolbar Mobile */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center justify-between gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
            className="px-3 py-2 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
          >
            <option value="all">Transações</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
          <Button
            size="icon"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Mais opções"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-center gap-3 px-3 py-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePreviousMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 min-w-fit">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">{monthLabel}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleNextMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Próximo mês"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Toolbar Desktop */}
      <div className="hidden md:flex items-center justify-between gap-3">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
          className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          <option value="all">Transações</option>
          <option value="income">Receitas</option>
          <option value="expense">Despesas</option>
        </select>

        <div className="flex items-center justify-center gap-3">
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePreviousMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2 min-w-fit">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-foreground">{monthLabel}</p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={handleNextMonth}
            className="text-muted-foreground hover:text-foreground h-8 w-8"
            aria-label="Próximo mês"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Mais opções"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Card Resumo do Mês */}
      <div className="grid grid-cols-2 gap-3">
        <Item variant="muted" size="sm">
          <ItemContent>
            <ItemDescription className="text-xs">{firstLabel}</ItemDescription>
            <ItemTitle className={cn("text-lg sm:text-xl font-semibold", firstIsPositive ? "text-green-600" : "text-red-600")}>
              R$ {firstValue.toFixed(2).replace(".", ",")}
            </ItemTitle>
          </ItemContent>
        </Item>
        <Item variant="muted" size="sm">
          <ItemContent>
            <ItemDescription className="text-xs">{secondLabel}</ItemDescription>
            <ItemTitle className={cn("text-lg sm:text-xl font-semibold", secondIsPositive ? "text-green-600" : "text-red-600")}>
              R$ {secondValue.toFixed(2).replace(".", ",")}
            </ItemTitle>
          </ItemContent>
        </Item>
      </div>

      {/* Lista de transações */}
      <section>
        <ItemGroup className="gap-2">
          {filteredTransactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ItemGroup>
      </section>

      {/* FAB Mobile */}
      <FloatingActionButton icon={<Plus className="w-6 h-6" />} />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
