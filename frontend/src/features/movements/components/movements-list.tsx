import { type FC } from "react";
import { useInfiniteMovements } from "../api/get-movements";
import { ArchiveXIcon } from "lucide-react";
import { formatDate } from "@/utils/format";

export const MovementsList: FC = () => {
  const movementsQuery = useInfiniteMovements();

  if (movementsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <span>Loading movements...</span>
      </div>
    );
  }

  const movements = movementsQuery.data?.pages.flatMap((page) => page.data.items);

  if (!movements?.length)
    return (
      <div
        role="list"
        aria-label="comments"
        className="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
      >
        <ArchiveXIcon className="size-10" />
        <h4>No Comments Found</h4>
      </div>
    );

  return (
    <>
      <ul aria-label="movements" className="flex flex-col space-y-3">
        {movements.map((movement, index) => (
          <li
            aria-label={`movement-${movement.id}-${index}`}
            key={movement.id}
            className="w-full bg-white p-4 shadow-sm"
          >
            <div className="flex justify-between">
              <div>
                <span className="text-xs font-semibold">{formatDate(movement.occurredAt)}</span>
                <span className="ml-2 text-sm">{movement.direction}</span>
                <span className="ml-2 text-sm font-medium">{movement.amount}</span>
                <span className="ml-2 text-sm text-gray-500">{movement.description}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {movementsQuery.hasNextPage && (
        <div className="flex items-center justify-center py-4">
          <button onClick={() => movementsQuery.fetchNextPage()}>
            {movementsQuery.isFetchingNextPage ? "Loading..." : "Load More Movements"}
          </button>
        </div>
      )}
    </>
  );
};
