import { Card } from "@/components/ui/Card";

import type { MovementsSummaryDto } from "../../api/types";

type MovementsSummaryProps = {
  summary: MovementsSummaryDto;
};

export const MovementsSummary = ({ summary }: MovementsSummaryProps) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="text-xs text-muted-foreground">
        Resumo do período (ajustado conforme filtro selecionado)
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Card className="flex flex-col gap-1 border-dashed px-4 py-3">
          <span className="text-xs text-muted-foreground">Receitas</span>
          <span className="text-lg font-semibold text-emerald-600">
            R$ {summary.totals.totalIncome.toLocaleString("pt-BR")}
          </span>
          <span className="text-[11px] text-muted-foreground">Total de entradas no período</span>
        </Card>

        <Card className="flex flex-col gap-1 border-dashed px-4 py-3">
          <span className="text-xs text-muted-foreground">Despesas</span>
          <span className="text-lg font-semibold text-red-600">
            R$ {summary.totals.totalExpense.toLocaleString("pt-BR")}
          </span>
          <span className="text-[11px] text-muted-foreground">Total de saídas no período</span>
        </Card>

        <Card className="flex flex-col gap-1 border-dashed px-4 py-3">
          <span className="text-xs text-muted-foreground">Balanço</span>
          <span className="text-lg font-semibold text-foreground">
            R$ {summary.totals.balance.toLocaleString("pt-BR")}
          </span>
          <span className="text-[11px] text-muted-foreground">Receitas - Despesas</span>
        </Card>
      </div>
    </section>
  );
};
