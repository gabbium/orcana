import { ItemGroup } from "@/components/ui/Item";

import type { Transaction } from "../../types/transaction";
import { TransactionCard } from "../TransactionCard/TransactionCard";

export type TransactionListProps = {
  transactions: Transaction[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <ItemGroup className="gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} transaction={t} />
      ))}
    </ItemGroup>
  );
};
