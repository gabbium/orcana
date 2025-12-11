import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ItemGroup } from "@/components/ui/Item";
import {
  TransactionToolbar,
  type Transaction,
  TransactionSummaryCard,
  TransactionCard,
} from "@/features/transactions";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    icon: "🍽",
    title: "Almoço restaurante",
    category: "Alimentação",
    date: "10 set",
    amount: 45.0,
    status: "confirmed",
    kind: "expense",
  },
  {
    id: "2",
    icon: "💼",
    title: "Freelancer UI",
    category: "Trabalho extra",
    date: "15 set",
    amount: 800.0,
    status: "pending",
    kind: "income",
  },
  {
    id: "3",
    icon: "💡",
    title: "Conta de luz",
    category: "Moradia",
    date: "20 set",
    amount: 230.0,
    status: "pending",
    kind: "expense",
  },
  {
    id: "4",
    icon: "🏠",
    title: "Aluguel",
    category: "Moradia",
    date: "01 set",
    amount: 1200.0,
    status: "confirmed",
    kind: "expense",
  },
  {
    id: "5",
    icon: "💰",
    title: "Salário",
    category: "Receita",
    date: "05 set",
    amount: 5000.0,
    status: "confirmed",
    kind: "income",
  },
];

const TransactionsPage = () => {
  const [filterType, setFilterType] = useState<"all" | "expense" | "income">("all");

  return (
    <div className="flex flex-col gap-4 relative">
      <TransactionToolbar
        filterType={filterType}
        onFilterTypeChange={(type) => setFilterType(type as "all" | "expense" | "income")}
        monthLabel="setembro de 2025"
        onPreviousMonth={() => {}}
        onNextMonth={() => {}}
      />

      {filterType === "all" && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCard label="Saldo Atual" value={2450.0} isPositive={true} />
          <TransactionSummaryCard label="Balanço do Mês" value={2450.0} isPositive={true} />
        </ItemGroup>
      )}

      {filterType === "expense" && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCard label="Total Pago" value={1475.0} />
          <TransactionSummaryCard label="Total Pendente" value={230.0} />
        </ItemGroup>
      )}

      {filterType === "income" && (
        <ItemGroup className="grid grid-cols-2 gap-3">
          <TransactionSummaryCard label="Total Recebido" value={5800.0} isPositive />
          <TransactionSummaryCard label="Total Pendente" value={800.0} isPositive />
        </ItemGroup>
      )}

      <ItemGroup className="gap-2">
        {mockTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} {...transaction} />
        ))}
      </ItemGroup>

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
