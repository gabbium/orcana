import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item";
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
      <ItemMedia variant="icon">{category.icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{category.name}</ItemTitle>
        <ItemDescription className="text-xs">
          {category.status}
          {category.transactionCount > 0 && ` • ${category.transactionCount} transações`}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

const CategoriesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("expense");

  return (
    <div className="flex flex-col gap-3 sm:gap-4 relative">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Categorias</p>
          <p className="text-xs text-muted-foreground">Grupos para receitas e despesas</p>
        </div>
        <Button size="sm" className="text-xs">
          Nova categoria
        </Button>
      </header>

      <section>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="w-full">
            <TabsTrigger value="expense">Despesas</TabsTrigger>
            <TabsTrigger value="income">Receitas</TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      <section>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsContent value="expense" className="">
            <ItemGroup className="gap-2">
              {expenseCategories.map((category) => (
                <CategoryLine key={category.id} category={category} />
              ))}
            </ItemGroup>
          </TabsContent>
          <TabsContent value="income" className="mt-0 space-y-2">
            {incomeCategories.map((category) => (
              <CategoryLine key={category.id} category={category} />
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
