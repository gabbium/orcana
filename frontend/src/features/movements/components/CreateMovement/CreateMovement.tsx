import type { FC } from "react";
import { useCreateMovement } from "../../api/create-movement";
import { MovementDirection } from "@/types/api";
import { Spinner } from "@/components/ui/Spinner";

export const CreateMovement: FC = () => {
  const createMovementMutation = useCreateMovement({
    mutationConfig: {
      onSuccess: (movement) => {
        console.log("Movement created successfully", movement);
      },
    },
  });

  return (
    <button
      onClick={() =>
        createMovementMutation.mutate({
          amount: 100,
          direction: MovementDirection.Income,
          occurredAt: new Date().toISOString(),
          description: "Sample movement",
        })
      }
      disabled={createMovementMutation.isPending}
    >
      {createMovementMutation.isPending ? <Spinner /> : "Create Movement"}
    </button>
  );
};
