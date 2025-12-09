import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/Item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

interface Category {
  id: string;
  icon: string;
  name: string;
  status: string;
  transactionCount: number;
}

const expenseCategories: Category[] = [
  { id: "1", icon: "🍽", name: "Alimentação", status: "Ativa", transactionCount: 12 },
  { id: "2", icon: "🏠", name: "Moradia", status: "Ativa", transactionCount: 2 },
  { id: "3", icon: "🎮", name: "Lazer", status: "Arquivada", transactionCount: 0 },
];

const incomeCategories: Category[] = [
  { id: "4", icon: "💼", name: "Salário", status: "Ativa", transactionCount: 2 },
  { id: "5", icon: "🧾", name: "Freelancer", status: "Ativa", transactionCount: 0 },
];

function CategoryLine({ category }: { category: Category }) {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia>
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
          {category.icon}
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-sm">{category.name}</ItemTitle>
        <p className="text-xs text-muted-foreground">
          {category.status}
          {category.transactionCount > 0 && ` • ${category.transactionCount} transações`}
        </p>
      </ItemContent>
    </Item>
  );
}

const CategoriesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("expense");

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Categorias</div>
        <Button size="sm" className="whitespace-nowrap">
          Nova categoria
        </Button>
      </div>

      <Card className="p-2.5 sm:p-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-2.5 sm:mb-3">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm font-medium text-foreground">Gerenciar categorias</h2>
            <p className="text-xs text-muted-foreground">Separe receitas e despesas por grupos</p>
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-auto">
            <TabsList>
              <TabsTrigger value="expense">Despesas</TabsTrigger>
              <TabsTrigger value="income">Receitas</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsContent value="expense" className="flex flex-col gap-1.5">
            {expenseCategories.map((category) => (
              <CategoryLine key={category.id} category={category} />
            ))}
          </TabsContent>
          <TabsContent value="income" className="flex flex-col gap-1.5">
            {incomeCategories.map((category) => (
              <CategoryLine key={category.id} category={category} />
            ))}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
