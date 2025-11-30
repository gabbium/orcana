import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const MovementsHeader = () => {
  return (
    <header className="flex flex-wrap items-center justify-between border-b bg-background px-6 py-4">
      <h1 className="text-lg font-semibold">Movimentações</h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <TrendingDownIcon className="text-red-600" />
          Adicionar despesa
        </Button>
        <Button variant="outline" size="sm">
          <TrendingUpIcon className="text-emerald-600" />
          Adicionar receita
        </Button>
      </div>
    </header>
  );
};
