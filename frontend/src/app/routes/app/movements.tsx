import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { startOfMonth } from "date-fns";
import { DollarSignIcon, FileIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTable, DataTableColumnHeader } from "@/components/ui/DataTable";
import { DatePicker } from "@/components/ui/DatePicker";
import { Field, FieldError, FieldLabel } from "@/components/ui/Field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/InputGroup";
import { Label } from "@/components/ui/Label";
import { MonthYearPicker } from "@/components/ui/MonthYearPicker";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResponsiveDialog } from "@/components/ui/ResponsiveDialog";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { type Movement } from "@/types/api";

const createIncomePayloadSchema = z.object({
  amount: z.number().positive(),
  description: z.string().max(128).optional(),
  occurredAt: z.iso.date(),
});

type CreateIncomePayload = z.infer<typeof createIncomePayloadSchema>;

const CreateIncomeDialog = () => {
  const [isDone, setIsDone] = useState(false);

  const form = useForm({
    defaultValues: {} as CreateIncomePayload,
    validators: {
      onSubmit: createIncomePayloadSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      setIsDone(true);
    },
  });

  return (
    <ResponsiveDialog
      title="Create income"
      description="Creates new income."
      isDone={isDone}
      triggerButton={<Button size="sm">Create Income</Button>}
      submitButton={
        <Button form="create-income" type="submit" size="sm">
          Submit
        </Button>
      }
    >
      <form
        id="create-income"
        onSubmit={(e) => {
          e.preventDefault();
          setIsDone(false);
          form.handleSubmit();
        }}
        className="space-y-4 pt-2"
      >
        <form.Field
          name="amount"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Amount</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <DollarSignIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="number"
                    placeholder="0.00"
                    id={field.name}
                    name={field.name}
                    value={field.state.value === 0 ? "" : field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>USD</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="description"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <FileIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="Monthly salary, Groceries..."
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="occurredAt"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <Label htmlFor={field.name}>Occurred at</Label>
                <DatePicker
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  aria-invalid={isInvalid}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </form>
    </ResponsiveDialog>
  );
};

const MOCK_INCOMES: Movement[] = [
  {
    id: "1",
    direction: "income",
    amount: 5000,
    description: "Monthly salary",
    occurredAt: "2025-03-05T00:00:00.000Z",
  },
];

type MovementsDataTableProps = {
  data: Movement[];
};

const MovementsDataTable = ({ data }: MovementsDataTableProps) => {
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
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      enableRowSelection
      toolbarActions={<CreateIncomeDialog />}
    />
  );
};

const RouteComponent = () => {
  const [period, setPeriod] = useState(() => startOfMonth(new Date()));

  const movements = MOCK_INCOMES;

  const income = movements
    .filter((m) => m.direction === "income")
    .reduce((acc, m) => acc + m.amount, 0);

  const expense = movements
    .filter((m) => m.direction === "expense")
    .reduce((acc, m) => acc + m.amount, 0);

  const balance = income - expense;

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
      <MovementsDataTable data={movements} />
    </>
  );
};

export const Route = createFileRoute("/app/movements")({
  component: RouteComponent,
});
