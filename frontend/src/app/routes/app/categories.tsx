import { createFileRoute } from "@tanstack/react-router";
import { MoreVerticalIcon, PlusIcon } from "lucide-react";
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
import { Tabs, TabsContent } from "@/components/ui/Tabs";

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
      <header className="flex items-center justify-between gap-2">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          <option value="expense">Categorias de despesa</option>
          <option value="income">Categorias de receitas</option>
        </select>
        <Button
          size="icon"
          variant="ghost"
          className="text-muted-foreground hover:text-foreground h-8 w-8"
          aria-label="Mais opções"
        >
          <MoreVerticalIcon className="w-4 h-4" />
        </Button>
      </header>

      <section>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsContent value="all" className="">
            <ItemGroup className="gap-2">
              {expenseCategories.map((category) => (
                <CategoryLine key={category.id} category={category} />
              ))}
              {incomeCategories.map((category) => (
                <CategoryLine key={category.id} category={category} />
              ))}
            </ItemGroup>
          </TabsContent>
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

      <FloatingActionButton icon={<PlusIcon />} />
    </div>
  );
};

export const Route = createFileRoute("/app/categories")({
  component: CategoriesPage,
});
