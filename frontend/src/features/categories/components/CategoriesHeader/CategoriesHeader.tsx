import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

export const CategoriesHeader = () => {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Categorias</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie categorias e aplique filtros para encontrar o que precisa.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm">
          <PlusIcon className="h-4 w-4" />
          Nova categoria
        </Button>
      </div>
    </header>
  );
};
