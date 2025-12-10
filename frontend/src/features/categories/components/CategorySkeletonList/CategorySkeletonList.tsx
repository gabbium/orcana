import { CategorySkeletonItem } from "../CategorySkeletonItem";

export type CategorySkeletonListProps = {
  count?: number;
};

export const CategorySkeletonList = ({ count = 3 }: CategorySkeletonListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <CategorySkeletonItem key={i} />
      ))}
    </div>
  );
};
