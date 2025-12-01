import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { parseISO, startOfDay } from "date-fns";

import {
  createMovement,
  MovementsExpenseForm,
  movementsQueries,
  type MovementsCreateSchema,
} from "@/features/movements";
import { toast } from "@/lib/toaster";

import { Route as ParentRoute } from "../../movements";

const MovementsExpenseCreatePage = () => {
  const navigate = Route.useNavigate();
  const parentSearch = ParentRoute.useSearch();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: movementsQueries.all });
      toast.success("Despesa registrada com sucesso.");
      navigate({
        to: "/app/movements",
        search: () => parentSearch,
        replace: true,
      });
    },
  });

  const handleSubmit = (value: MovementsCreateSchema) => {
    mutation.mutate({
      ...value,
      occurredAt: startOfDay(parseISO(value.occurredAt)).toISOString(),
      direction: "Expense",
    });
  };

  const handleClose = () => {
    navigate({
      to: "/app/movements",
      search: () => parentSearch,
    });
  };

  return <MovementsExpenseForm onSubmit={handleSubmit} onClose={handleClose} />;
};

export const Route = createFileRoute("/app/movements/create/expense")({
  component: MovementsExpenseCreatePage,
});
