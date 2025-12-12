import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";

import { CATEGORY_KIND, type CategoryKind } from "../../constants/enums";

export type CategoryFilter = {
  kind: CategoryKind;
};

export type CategoryToolbarProps = {
  filter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
};

export const CategoryToolbar = ({ filter, onFilterChange }: CategoryToolbarProps) => {
  const handleKindChange = (kind: CategoryKind) => {
    onFilterChange({ ...filter, kind });
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold text-foreground">Categorias</h1>
        <p className="text-xs text-muted-foreground">Gerencie suas categorias de despesas e receitas</p>
      </div>

      <NativeSelect
        value={filter.kind}
        onChange={(e) => handleKindChange(e.target.value as CategoryKind)}
      >
        <NativeSelectOption value={CATEGORY_KIND.EXPENSE}>Despesas</NativeSelectOption>
        <NativeSelectOption value={CATEGORY_KIND.INCOME}>Receitas</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
