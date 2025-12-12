import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  TransactionForm,
  TransactionFormSkeleton,
  useTransaction,
  useUpdateTransaction,
  type TransactionFormSchema,
} from "@/features/transactions";

const UpdateTransactionPage = () => {
  const { id } = Route.useParams() as { id: string };
  const navigate = useNavigate();

  const { data: transaction, isLoading } = useTransaction({ transactionId: id });

  const updateTransactionMutation = useUpdateTransaction({
    mutationConfig: {
      onSuccess: () => {
        navigate({ to: "/app/transactions", search: (prev) => prev });
      },
    },
  });

  const handleSubmit = (value: TransactionFormSchema) => {
    updateTransactionMutation.mutate({
      data: value,
      transactionId: id,
    });
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
          <h1 className="text-lg font-semibold text-foreground">Editar transação</h1>
          <p className="text-xs text-muted-foreground">Atualize os dados da transação</p>
        </div>
      </div>

      {isLoading || !transaction ? (
        <TransactionFormSkeleton />
      ) : (
        <TransactionForm
          defaultValues={transaction}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={updateTransactionMutation.isPending}
        />
      )}
    </div>
  );
};

export const Route = createFileRoute("/app/transactions/$id/edit")({
  component: UpdateTransactionPage,
});
