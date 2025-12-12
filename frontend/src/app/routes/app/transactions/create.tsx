import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { TransactionForm, useCreateTransaction, type TransactionFormSchema } from "@/features/transactions";

const CreateTransactionPage = () => {
  const navigate = useNavigate();

  const createTransactionMutation = useCreateTransaction({
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: "/app/transactions", search: (prev) => prev });
      },
    },
  });

  const handleSubmit = (value: TransactionFormSchema) => {
    createTransactionMutation.mutate(value);
  };

  const handleCancel = () => {
    navigate({ to: "/app/transactions", search: (prev) => prev });
  };

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeftIcon className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Nova transação</h1>
          <p className="text-xs text-muted-foreground">Preencha os dados da transação</p>
        </div>
      </div>

      <TransactionForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={createTransactionMutation.isPending}
      />
    </div>
  );
};

export const Route = createFileRoute("/app/transactions/create")({
  component: CreateTransactionPage,
});
