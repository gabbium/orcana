import { ItemGroup } from "@/components/ui/Item";

import type { Transaction } from "../../types/transaction";
import { TransactionCard, TransactionCardSkeleton } from "../TransactionCard";

export type TransactionListProps = {
  transactions: Transaction[];
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <ItemGroup className="gap-2">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          title={transaction.title}
          icon={transaction.icon}
          category={transaction.category}
          date={transaction.date}
          amount={transaction.amount}
          status={transaction.status}
          kind={transaction.kind}
        />
      ))}
    </ItemGroup>
  );
};

export type TransactionListSkeletonProps = {
  count?: number;
};

export const TransactionListSkeleton = ({ count = 3 }: TransactionListSkeletonProps) => {
  return (
    <ItemGroup className="gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <TransactionCardSkeleton key={index} />
      ))}
    </ItemGroup>
  );
};
