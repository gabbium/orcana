import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/Button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";
import { Skeleton } from "@/components/ui/Skeleton";

import { TRANSACTION_KIND, TRANSACTION_STATUS, type TransactionKind, type TransactionStatus } from "../../constants/enums";
import { transactionFormSchema, type TransactionFormSchema } from "../../schemas/transaction";

export type TransactionFormProps = {
  defaultValues?: Partial<TransactionFormSchema>;
  onSubmit: (value: TransactionFormSchema) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export const TransactionForm = ({
  defaultValues = {
    title: "",
    icon: "",
    category: "",
    date: "",
    amount: 0,
    kind: undefined,
    status: TRANSACTION_STATUS.PENDING,
  },
  onSubmit,
  onCancel,
  isSubmitting = false,
}: TransactionFormProps) => {
  const form = useForm({
    defaultValues: defaultValues as TransactionFormSchema,
    validators: {
      onSubmit: transactionFormSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="text-sm gap-4">
          <form.Field
            name="kind"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Tipo</FieldLabel>
                  <NativeSelect
                    id={field.name}
                    name={field.name}
                    value={field.state.value || ""}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value as TransactionKind)}
                    aria-invalid={isInvalid}
                  >
                    <NativeSelectOption value="">Selecione um tipo</NativeSelectOption>
                    <NativeSelectOption value={TRANSACTION_KIND.EXPENSE}>Despesa</NativeSelectOption>
                    <NativeSelectOption value={TRANSACTION_KIND.INCOME}>Receita</NativeSelectOption>
                  </NativeSelect>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="title"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Título</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Ex.: Almoço no restaurante"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="category"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Categoria</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Ex.: Alimentação"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="icon"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Ícone</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Ex.: 🍔"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="amount"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Valor</FieldLabel>
                    <Input
                      type="number"
                      placeholder="0.00"
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(parseFloat(event.target.value) || 0)}
                      aria-invalid={isInvalid}
                      step="0.01"
                      min="0"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </div>

          <form.Field
            name="date"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Data</FieldLabel>
                  <Input
                    type="date"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="status"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <NativeSelect
                    id={field.name}
                    name={field.name}
                    value={field.state.value || ""}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value as TransactionStatus)}
                    aria-invalid={isInvalid}
                  >
                    <NativeSelectOption value={TRANSACTION_STATUS.PENDING}>Pendente</NativeSelectOption>
                    <NativeSelectOption value={TRANSACTION_STATUS.CONFIRMED}>Confirmada</NativeSelectOption>
                  </NativeSelect>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <div className="flex gap-2 pt-4 justify-end">
          {onCancel && (
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export const TransactionFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
};
