import { ItemGroup } from "@/components/ui/Item";

import { TransactionSummaryCard } from "../TransactionSummaryCard/TransactionSummaryCard";

export type TransactionSummaryGroupProps = {
  items: Array<{
    label: string;
    value: number;
    isPositive: boolean;
  }>;
};

export const TransactionSummaryGroup = ({ items }: TransactionSummaryGroupProps) => {
  return (
    <ItemGroup className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <TransactionSummaryCard key={item.label} {...item} />
      ))}
    </ItemGroup>
  );
};
