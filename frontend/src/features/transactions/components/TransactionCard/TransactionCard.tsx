import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";

import {
  TRANSACTION_KIND,
  TRANSACTION_STATUS,
  type TransactionKind,
  type TransactionStatus,
} from "../../constants/enums";

export type TransactionCardProps = {
  title: string;
  icon: string;
  category: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  kind: TransactionKind;
};

export const TransactionCard = ({
  title,
  icon,
  category,
  date,
  amount,
  status,
  kind,
}: TransactionCardProps) => {
  const isExpense = kind === TRANSACTION_KIND.EXPENSE;
  const isConfirmed = status === TRANSACTION_STATUS.CONFIRMED;
  const amountColor = isExpense ? "text-red-600" : "text-green-600";

  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">{icon}</ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription className="text-xs">
          {category} • {date}
        </ItemDescription>
      </ItemContent>
      <ItemContent>
        <ItemTitle className={amountColor}>R$ {amount.toFixed(2).replace(".", ",")}</ItemTitle>
        <ItemDescription className="text-xs text-right">
          {isConfirmed ? "Pago" : kind === TRANSACTION_KIND.INCOME ? "A receber" : "A pagar"}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
};
