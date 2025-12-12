import { Link } from "@tanstack/react-router";

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/Item";
import { Skeleton } from "@/components/ui/Skeleton";

import {
  TRANSACTION_KIND,
  TRANSACTION_STATUS,
  type TransactionKind,
  type TransactionStatus,
} from "../../constants/enums";

export type TransactionCardProps = {
  id: string;
  title: string;
  icon: string;
  category: string;
  date: string;
  amount: number;
  status: TransactionStatus;
  kind: TransactionKind;
};

export const TransactionCard = ({
  id,
  title,
  icon,
  category,
  date,
  amount,
  status,
  kind,
}: TransactionCardProps) => {
  const isExpense = kind === TRANSACTION_KIND.EXPENSE;
  const amountColor = isExpense ? "text-red-600" : "text-green-600";
  const statusLabel = getStatusLabel(status, kind);

  return (
    <Item className="cursor-pointer" variant="outline" size="sm" asChild>
      <Link to="/app/transactions/$id/edit" params={{ id }}>
        <ItemMedia variant="icon">{icon}</ItemMedia>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>
            {category} • {date}
          </ItemDescription>
        </ItemContent>
        <ItemContent className="text-right">
          <ItemTitle className={amountColor}>R$ {amount.toFixed(2).replace(".", ",")}</ItemTitle>
          <ItemDescription>{statusLabel}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
};

export const TransactionCardSkeleton = () => {
  return (
    <Item className="cursor-pointer" variant="outline" size="sm">
      <ItemMedia variant="icon">
        <Skeleton className="h-6 w-6 rounded" />
      </ItemMedia>
      <ItemContent>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-40" />
      </ItemContent>
      <ItemContent>
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-3 w-16" />
      </ItemContent>
    </Item>
  );
};

const getStatusLabel = (status: TransactionStatus, kind: TransactionKind): string => {
  if (status === TRANSACTION_STATUS.CONFIRMED) {
    return kind === TRANSACTION_KIND.EXPENSE ? "Pago" : "Recebido";
  }
  return kind === TRANSACTION_KIND.INCOME ? "A receber" : "A pagar";
};
