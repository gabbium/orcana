import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/Item";

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

type FilterType = "all" | "income" | "expense" | "pending";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isExpense = transaction.type === "expense";
  const amountColor = isExpense ? "text-red-600" : "text-green-600";
  const amountSign = isExpense ? "−" : "+";

  return (
    <Item className="cursor-pointer" variant="outline">
      <ItemMedia>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center text-sm sm:text-base">
          {transaction.icon}
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{transaction.title}</ItemTitle>
        <p className="text-xs text-muted-foreground">
          {transaction.category} • {transaction.date}
        </p>
      </ItemContent>
      <div className="text-right flex flex-col gap-1">
        <div className={`text-sm sm:text-base font-semibold ${amountColor}`}>
          {amountSign} R$ {transaction.amount.toFixed(2).replace(".", ",")}
        </div>
        <div className="text-xs text-muted-foreground">
          {transaction.status === "confirmed"
            ? "Pago"
            : transaction.type === "income"
              ? "A receber"
              : "A pagar"}
        </div>
      </div>
    </Item>
  );
}

const TransactionsPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredTransactions = transactions.filter((tx) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "income") return tx.type === "income";
    if (activeFilter === "expense") return tx.type === "expense";
    if (activeFilter === "pending") return tx.status === "pending";
    return true;
  });

  const totalIncome = transactions
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Transações</div>
        <Button size="sm" className="whitespace-nowrap">
          Nova transação
        </Button>
      </div>

      <Card>
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Mini Balance */}
          <div className="bg-muted rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-muted-foreground">Saldo do mês</p>
              <p className="text-base sm:text-lg font-semibold text-foreground">
                R$ {balance.toFixed(2).replace(".", ",")}
              </p>
            </div>
            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                  Receitas: R$ {totalIncome.toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  Despesas: R$ {totalExpense.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {(["all", "income", "expense", "pending"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm whitespace-nowrap border transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-border-strong"
                }`}
              >
                {filter === "all"
                  ? "Todas"
                  : filter === "income"
                    ? "Receitas"
                    : filter === "expense"
                      ? "Despesas"
                      : "Pendentes"}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="flex flex-col gap-2">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <div className="text-center py-6 text-xs text-muted-foreground">
                Nenhuma transação encontrada
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
