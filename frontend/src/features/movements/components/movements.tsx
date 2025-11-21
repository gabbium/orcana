import type { FC } from "react";
import { MovementsList } from "./movements-list";
import { CreateMovement } from "./create-movement";

export const Movements: FC = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Comments:</h3>
        <CreateMovement />
      </div>
      <MovementsList />
    </div>
  );
};
