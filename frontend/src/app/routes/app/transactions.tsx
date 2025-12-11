import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  TransactionList,
  TransactionSummaryGroup,
  TransactionToolbar,
  type Transaction,
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
  const filtered = mockTransactions;

  const summaryConfigs = [
    { label: "Saldo atual", value: 2450.0, isPositive: true },
    { label: "Balanço do mês", value: 2450.0, isPositive: true },
  ];

  return (
    <div className="flex flex-col gap-4 relative">
      <TransactionToolbar
        filterType="all"
        onFilterTypeChange={() => {}}
        monthLabel="setembro de 2025"
        onPreviousMonth={() => {}}
        onNextMonth={() => {}}
      />
      <TransactionSummaryGroup items={summaryConfigs} />
      <TransactionList transactions={filtered} />
      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
