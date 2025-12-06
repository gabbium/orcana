import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { CategoriesTable } from "@/features/categories";

export const CategoriesPage = () => {
  return (
    <main className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Categorias</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie categorias e aplique filtros para encontrar o que precisa.
        </p>
      </div>
      <Suspense>
        <CategoriesTable />
      </Suspense>
    </main>
  );
};

export const Route = createFileRoute("/app/categories/")({
  component: CategoriesPage,
});
