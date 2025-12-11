import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ItemGroup } from "@/components/ui/Item";
import {
  OverviewBalanceCard,
  OverviewCategoryBreakdownCard,
  OverviewPendingCard,
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

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-foreground">Pendências</p>
        <ItemGroup className="grid grid-cols-2 gap-3">
          <OverviewPendingCard label="A receber" value={800} count={2} isPositive />
          <OverviewPendingCard label="A pagar" value={230} count={3} />
        </ItemGroup>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-foreground">Despesas por categoria</p>
        <ItemGroup className="gap-2">
          {mockCategories.map((category) => (
            <OverviewCategoryBreakdownCard key={category.name} {...category} />
          ))}
        </ItemGroup>
      </div>

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/overview")({
  component: OverviewPage,
});
