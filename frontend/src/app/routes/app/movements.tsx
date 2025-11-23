import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { startOfMonth } from "date-fns";
import { MoreHorizontalIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTable, DataTableColumnHeader } from "@/components/ui/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { type Movement, MovementDirection } from "@/types/api";

const MOCK_MOVEMENTS: Movement[] = [
  {
    id: "1",
    direction: "income",
    amount: 5000,
    description: "Monthly salary",
    occurredAt: "2025-03-05T00:00:00.000Z",
  },
  {
    id: "2",
    direction: "expense",
    amount: 350,
    description: "Groceries",
    occurredAt: "2025-03-07T00:00:00.000Z",
  },
];

type MovementsTableProps = {
  data: Movement[];
  onEdit: (movement: Movement | null) => void;
  onDelete: (movement: Movement) => void;
};

const MovementsTable = ({ data, onEdit, onDelete }: MovementsTableProps) => {
  const columns = useMemo<ColumnDef<Movement>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "occurredAt",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Occurred at" />,
        cell: ({ row }) => {
          const date = new Date(row.getValue("occurredAt") as string);
          return date.toLocaleDateString("en", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        },
        meta: {
          viewOptions: {
            title: "Occurred at",
          },
        },
      },
      {
        accessorKey: "description",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
        meta: {
          viewOptions: {
            title: "Description",
          },
          filter: {
            type: "text",
            title: "Search...",
          },
        },
        enableSorting: false,
      },
      {
        accessorKey: "direction",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Direction" />,
        cell: ({ row }) => {
          const direction = MovementDirection.find(
            (item) => item.value === row.getValue("direction"),
          );

          if (!direction) {
            return null;
          }

          return (
            <Badge variant="outline" className="text-muted-foreground px-1.5">
              {direction.icon && <direction.icon />}
              {direction.label}
            </Badge>
          );
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
        meta: {
          viewOptions: {
            title: "Direction",
          },
          filter: {
            type: "select",
            title: "Direction",
            options: [...MovementDirection],
          },
        },
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorKey: "amount",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => {
          const value = row.getValue("amount") as number;
          return value.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          });
        },
        meta: {
          viewOptions: {
            title: "Amount",
          },
        },
        enableSorting: false,
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const movement = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-fit">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit(movement)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(movement)} className="text-destructive">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onEdit, onDelete],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      enableRowSelection
      toolbarActions={
        <Button size="sm" onClick={() => onEdit(null)}>
          New Movement
        </Button>
      }
    />
  );
};

const RouteComponent = () => {
  const [period, setPeriod] = useState(() => startOfMonth(new Date()));

  const movements = MOCK_MOVEMENTS;

  const income = movements
    .filter((m) => m.direction === "income")
    .reduce((acc, m) => acc + m.amount, 0);

  const expense = movements
    .filter((m) => m.direction === "expense")
    .reduce((acc, m) => acc + m.amount, 0);

  const balance = income - expense;

  const handleEdit = (movement: Movement | null) => {
    console.log("EDIT MOVEMENT:", movement);
  };

  const handleDelete = (movement: Movement) => {
    console.log("DELETE MOVEMENT:", movement);
  };

  return (
    <>
      <PageHeader title="Movements" description="Monthly movements overview." />
      <MonthYearPicker value={period} onChange={setPeriod} />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <SummaryCard
          label="Income (period)"
          value={income.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
          variant="positive"
        />
        <SummaryCard
          label="Expenses (period)"
          value={expense.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
          variant="negative"
        />
        <SummaryCard
          label="Balance"
          value={balance.toLocaleString("en", {
            style: "currency",
            currency: "USD",
          })}
          variant="neutral"
        />
      </div>
      <MovementsTable data={movements} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export const Route = createFileRoute("/app/movements")({
  component: RouteComponent,
});
