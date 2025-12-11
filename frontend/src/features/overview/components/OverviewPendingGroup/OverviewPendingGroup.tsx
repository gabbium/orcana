import { ItemGroup } from "@/components/ui/Item";

import { OverviewPendingCard } from "../OverviewPendingCard";

export type OverviewPendingGroupProps = {
  receivable: number;
  payable: number;
  receivableCount: number;
  payableCount: number;
};

export const OverviewPendingGroup = ({
  receivable,
  payable,
  receivableCount,
  payableCount,
}: OverviewPendingGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-foreground">Pendências</p>
      <ItemGroup className="grid grid-cols-2 gap-3">
        <OverviewPendingCard
          label="A receber"
          value={receivable}
          count={receivableCount}
          isPositive={true}
        />
        <OverviewPendingCard
          label="A pagar"
          value={payable}
          count={payableCount}
          isPositive={false}
        />
      </ItemGroup>
    </div>
  );
};
