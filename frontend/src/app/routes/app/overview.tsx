import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import {
  OverviewBalanceCard,
  OverviewCategoryBreakdownGroup,
  OverviewPendingGroup,
  OverviewToolbar,
} from "@/features/overview";

const mockCategories = [
  {
    icon: "🍽",
    name: "Alimentação",
    amount: 950.0,
    count: 0,
    percentage: 38,
  },
  {
    icon: "🚗",
    name: "Transporte",
    amount: 680.0,
    count: 0,
    percentage: 27,
  },
  {
    icon: "🎬",
    name: "Lazer",
    amount: 520.0,
    count: 0,
    percentage: 20,
  },
];

const OverviewPage = () => {
  return (
    <div className="flex flex-col gap-4 relative">
      <OverviewToolbar monthLabel="dezembro de 2025" />
      <OverviewBalanceCard balance={2450} totalIncome={5800} totalExpense={2780} />
      <OverviewPendingGroup receivable={800} payable={230} receivableCount={2} payableCount={3} />
      <OverviewCategoryBreakdownGroup categories={mockCategories} />
      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/overview")({
  component: OverviewPage,
});
