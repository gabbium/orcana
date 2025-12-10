import { MoreVerticalIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { CATEGORY_KIND, type CategoryKind } from "../../types/category-kind";

export type CategoryToolbarProps = {
  kind: CategoryKind;
  onKindChange: (value: CategoryKind) => void;
};

export const CategoryToolbar = ({ kind, onKindChange }: CategoryToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <select
        value={kind}
        onChange={(e) => onKindChange(e.target.value as CategoryKind)}
        className="px-3 py-1 rounded-lg border border-border/60 bg-muted/30 text-sm text-foreground cursor-pointer hover:border-primary/50 transition-colors"
      >
        <option value={CATEGORY_KIND.EXPENSE}>Categorias de despesa</option>
        <option value={CATEGORY_KIND.INCOME}>Categorias de receitas</option>
      </select>
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground hover:text-foreground h-8 w-8"
        aria-label="Mais opções"
      >
        <MoreVerticalIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
