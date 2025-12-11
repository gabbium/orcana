import { ItemGroup } from "@/components/ui/Item";

import { OverviewCategoryBreakdownCard } from "../OverviewCategoryBreakdownCard/OverviewCategoryBreakdownCard";
import type { OverviewCategoryBreakdownCardProps } from "../OverviewCategoryBreakdownCard/OverviewCategoryBreakdownCard";

export type OverviewCategoryBreakdownGroupProps = {
  categories: OverviewCategoryBreakdownCardProps[];
};

export const OverviewCategoryBreakdownGroup = ({
  categories,
}: OverviewCategoryBreakdownGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-foreground">Despesas por categoria</p>
      <ItemGroup className="gap-2">
        {categories.map((category) => (
          <OverviewCategoryBreakdownCard key={category.name} {...category} />
        ))}
      </ItemGroup>
    </div>
  );
};
