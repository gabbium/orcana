import { createFileRoute } from "@tanstack/react-router";

import { Card } from "@/components/ui/Card";
import { Item, ItemMedia, ItemTitle, ItemDescription } from "@/components/ui/Item";

interface CategorySpending {
  id: string;
  icon: string;
  name: string;
  amount: number;
  transactionCount: number;
  percentage: number;
}

const categorySpending: CategorySpending[] = [
  {
    id: "1",
    icon: "🍽",
    name: "Alimentação",
    amount: 950.0,
    transactionCount: 12,
    percentage: 38,
  },
  {
    id: "2",
    icon: "🏠",
    name: "Moradia",
    amount: 800.0,
    transactionCount: 2,
    percentage: 31,
  },
  {
    id: "3",
    icon: "🚗",
    name: "Transporte",
    amount: 400.0,
    transactionCount: 6,
    percentage: 16,
  },
];

function SummaryCard({
  label,
  value,
  hint,
  color = "text-foreground",
}: {
  label: string;
  value: string;
  hint: string;
  color?: string;
}) {
  return (
    <div className="bg-muted/40 rounded-md border border-border p-2 sm:p-2.5 flex flex-col gap-1">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-base sm:text-lg font-semibold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

const OverviewPage = () => {
  const balance = 2450.0;
  const totalIncome = 5000.0;
  const totalExpense = 2550.0;
  const target = 2000.0;

  const pendingReceivable = 800.0;
  const pendingPayable = 350.0;
  const pendingReceivableCount = 2;
  const pendingPayableCount = 3;

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace(".", ",")}`;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">Resumo do mês</div>

      {/* SALDO DO MÊS CARD */}
      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-sm sm:text-base font-medium text-foreground">Saldo do mês</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Receitas − despesas confirmadas
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 bg-green-100/80 border border-green-200 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
            <span className="text-xs font-medium text-green-700">Dentro do plano</span>
          </div>
        </div>

        {/* Main balance */}
        <div className="flex items-baseline justify-between gap-2 mb-3">
          <div className="text-2xl sm:text-3xl font-bold text-foreground">
            {formatCurrency(balance)}
          </div>
          <div className="text-right text-xs text-muted-foreground space-y-1">
            <div>
              Meta: <span className="font-medium text-foreground">{formatCurrency(target)}</span>
            </div>
            <div>Baseado no mês selecionado</div>
          </div>
        </div>

        {/* Summary grid - Receitas e Despesas */}
        <div className="grid grid-cols-2 gap-2">
          <SummaryCard
            label="Receitas"
            value={formatCurrency(totalIncome)}
            hint="2 pendentes a receber"
            color="text-green-600 font-semibold"
          />
          <SummaryCard
            label="Despesas"
            value={formatCurrency(totalExpense)}
            hint="3 pendentes a pagar"
            color="text-red-600 font-semibold"
          />
        </div>
      </Card>

      {/* PENDENCIES AND CATEGORIES ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* PENDÊNCIAS CARD */}
        <Card>
          <div className="flex flex-col gap-1 mb-3 sm:mb-4">
            <h2 className="text-sm sm:text-base font-medium text-foreground">Pendências</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Lançamentos ainda não pagos/recebidos
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <SummaryCard
              label="A receber"
              value={formatCurrency(pendingReceivable)}
              hint={`${pendingReceivableCount} lançamentos`}
              color="text-green-600 font-semibold"
            />
            <SummaryCard
              label="A pagar"
              value={formatCurrency(pendingPayable)}
              hint={`${pendingPayableCount} lançamentos`}
              color="text-red-600 font-semibold"
            />
          </div>
        </Card>

        {/* POR CATEGORIA CARD */}
        <Card>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-sm sm:text-base font-medium text-foreground">Por categoria</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Distribuição das despesas do mês
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full border border-border bg-muted/40 text-muted-foreground whitespace-nowrap">
              Lista simples
            </span>
          </div>

          <div className="flex flex-col gap-2 mb-3">
            {categorySpending.map((category) => (
              <Item key={category.id} variant="muted" size="sm" className="cursor-pointer">
                <ItemMedia variant="icon">{category.icon}</ItemMedia>
                <div className="flex-1">
                  <ItemTitle>{category.name}</ItemTitle>
                  <ItemDescription>
                    {formatCurrency(category.amount)} em {category.transactionCount} lançamentos
                  </ItemDescription>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold text-foreground">
                    {category.percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">do total</div>
                </div>
              </Item>
            ))}
          </div>

          <div className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/50">
            No produto final, este bloco pode virar gráfico (pizza ou barras) usando os mesmos
            dados.
          </div>
        </Card>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/app/overview")({
  component: OverviewPage,
});
