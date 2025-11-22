import type { FC } from "react";
import { ListMovements } from "../ListMovements";
import { CreateMovement } from "../CreateMovement";

export const Movements: FC = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Movements</h3>
        <CreateMovement />
      </div>
      <ListMovements />
    </div>
  );
};
