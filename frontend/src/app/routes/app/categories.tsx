import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { CategoryList, CategoryToolbar } from "@/features/categories";

const mockCategories = [
  {
    id: "1",
    name: "Alimentação",
    icon: "🍽",
    status: "active",
    transactionCount: 12,
    kind: "expense" as const,
  },
  {
    id: "2",
    name: "Transporte",
    icon: "🚗",
    status: "active",
    transactionCount: 8,
    kind: "expense" as const,
  },
  {
    id: "3",
    name: "Lazer",
    icon: "🎬",
    status: "active",
    transactionCount: 5,
    kind: "expense" as const,
  },
  {
    id: "4",
    name: "Salário",
    icon: "💼",
    status: "active",
    transactionCount: 2,
    kind: "income" as const,
  },
  {
    id: "5",
    name: "Freelancer",
    icon: "📱",
    status: "active",
    transactionCount: 4,
    kind: "income" as const,
  },
];

const CategoriesPage = () => {
  return (
    <div className="flex flex-col gap-4 relative">
      <CategoryToolbar kind="expense" onKindChange={() => {}} />
      <CategoryList categories={mockCategories.filter((c) => c.kind === "expense")} />
      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
