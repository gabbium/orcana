import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";

import { TRANSACTION_KIND, TRANSACTION_STATUS } from "../../constants/enums";
import type { Transaction } from "../../types/transaction";

export type TransactionCardProps = {
  transaction: Transaction;
};

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isExpense = transaction.kind === TRANSACTION_KIND.EXPENSE;
  const isConfirmed = transaction.status === TRANSACTION_STATUS.CONFIRMED;
  const amountColor = isExpense ? "text-red-600" : "text-green-600";

  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">{transaction.icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{transaction.title}</ItemTitle>
        <ItemDescription className="text-xs">
          {transaction.category} • {transaction.date}
        </ItemDescription>
      </ItemContent>
      <ItemContent>
        <ItemTitle className={amountColor}>
          R$ {transaction.amount.toFixed(2).replace(".", ",")}
        </ItemTitle>
        <ItemDescription className="text-xs text-right">
          {isConfirmed
            ? "Pago"
            : transaction.kind === TRANSACTION_KIND.INCOME
              ? "A receber"
              : "A pagar"}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};
