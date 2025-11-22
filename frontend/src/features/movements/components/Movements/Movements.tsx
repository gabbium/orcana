import type { FC } from "react";
import { ListMovements } from "../ListMovements";
import { CreateMovement } from "../CreateMovement";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "lucide-react";

export const Movements: FC = () => {
  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">Movimentos</h4>
          <p className="text-muted-foreground text-sm">Lista de lançamentos registrados pela Ana</p>
        </div>
        <div className="shrink-0">
          <Button variant="default" size="sm">
            <PlusIcon />
            Novo movimento
          </Button>
        </div>
      </div>
      {/* <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Movements</h3>
        <CreateMovement />
      </div>
      <ListMovements /> */}
    </div>
  );
};
