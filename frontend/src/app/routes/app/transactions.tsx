import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/Button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/Item";

interface Transaction {
  id: string;
  icon: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  status: "confirmed" | "pending";
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  {
    id: "1",
    icon: "🍽",
    title: "Almoço restaurante",
    category: "Alimentação",
    date: "10 set",
    amount: 45.0,
    status: "confirmed",
    type: "expense",
  },
  {
    id: "2",
    icon: "💼",
    title: "Freelancer UI",
    category: "Trabalho extra",
    date: "15 set",
    amount: 800.0,
    status: "pending",
    type: "income",
  },
  {
    id: "3",
    icon: "💡",
    title: "Conta de luz",
    category: "Moradia",
    date: "20 set",
    amount: 230.0,
    status: "pending",
    type: "expense",
  },
  {
    id: "4",
    icon: "🏠",
    title: "Aluguel",
    category: "Moradia",
    date: "01 set",
    amount: 1200.0,
    status: "confirmed",
    type: "expense",
  },
  {
    id: "5",
    icon: "💰",
    title: "Salário",
    category: "Receita",
    date: "05 set",
    amount: 5000.0,
    status: "confirmed",
    type: "income",
  },
];

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const isExpense = transaction.type === "expense";
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
          {transaction.status === "confirmed"
            ? "Pago"
            : transaction.type === "income"
              ? "A receber"
              : "A pagar"}
        </ItemDescription>
      </ItemContent>
    </Item>
  );
}

const TransactionsPage = () => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <header className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Transações</p>
          <p className="text-xs text-muted-foreground">Lista do mês selecionado</p>
        </div>
        <Button size="sm" className="text-xs">
          Nova transação
        </Button>
      </header>

      <section>
        <ItemGroup className="gap-2">
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </ItemGroup>
      </section>
    </div>
  );
};

export const Route = createFileRoute("/app/transactions")({
  component: TransactionsPage,
});
