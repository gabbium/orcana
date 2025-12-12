import { ItemGroup } from "@/components/ui/Item";

import { TRANSACTION_KIND, type TransactionKind } from "../../constants/enums";
import type { TransactionSummary } from "../../types/transaction";
import { TransactionSummaryCard, TransactionSummaryCardSkeleton } from "../TransactionSummaryCard";

export type TransactionSummaryGroupProps = {
  summary: TransactionSummary;
  mode?: TransactionKind | null;
};

export const TransactionSummaryGroup = ({ summary, mode }: TransactionSummaryGroupProps) => {
  if (mode === TRANSACTION_KIND.EXPENSE) {
    return (
      <ItemGroup className="grid grid-cols-2 gap-3">
        <TransactionSummaryCard label="Total Pago" value={summary.expense.confirmed.value} />
        <TransactionSummaryCard label="Total Pendente" value={summary.expense.pending.value} />
      </ItemGroup>
    );
  }

  if (mode === TRANSACTION_KIND.INCOME) {
    return (
      <ItemGroup className="grid grid-cols-2 gap-3">
        <TransactionSummaryCard
          label="Total Recebido"
          value={summary.income.confirmed.value}
          isPositive
        />
        <TransactionSummaryCard
          label="Total Pendente"
          value={summary.income.pending.value}
          isPositive
        />
      </ItemGroup>
    );
  }

  return (
    <ItemGroup className="grid grid-cols-2 gap-3">
      <TransactionSummaryCard
        label="Saldo Atual"
        value={summary.currentBalance}
        isPositive={summary.currentBalance >= 0}
      />
      <TransactionSummaryCard
        label="Balanço do Mês"
        value={summary.monthlyBalance}
        isPositive={summary.monthlyBalance >= 0}
      />
    </ItemGroup>
  );
};

export const TransactionSummaryGroupSkeleton = () => {
  return (
    <ItemGroup className="grid grid-cols-2 gap-3">
      <TransactionSummaryCardSkeleton />
      <TransactionSummaryCardSkeleton />
    </ItemGroup>
  );
};
