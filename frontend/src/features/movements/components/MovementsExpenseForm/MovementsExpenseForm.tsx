import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { NumericFormat } from "react-number-format";

import { ResponsiveDialog } from "@/components/compound/ResponsiveDialog";
import { Button } from "@/components/ui/Button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/InputGroup";

import { movementsCreateSchema, type MovementsCreateSchema } from "../../api/schemas";


type MovementsExpenseFormProps = {
  onClose: () => void;
  onSubmit: (value: MovementsCreateSchema) => void;
};

export const MovementsExpenseForm = ({ onClose, onSubmit }: MovementsExpenseFormProps) => {
  const form = useForm({
    defaultValues: {
      amount: 0,
      occurredAt: format(new Date(), "yyyy-MM-dd"),
      description: "",
    },
    validators: {
      onSubmit: movementsCreateSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <ResponsiveDialog
      open
      onOpenChange={onClose}
      title="Nova despesa"
      description="Registre uma saída realizada no seu orçamento."
      closeButton={
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      }
      submitButton={
        <Button
          form="movements-expense-form"
          type="submit"
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Salvar despesa
        </Button>
      }
    >
      <form
        id="movements-expense-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <form.Field
              name="amount"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Valor</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <InputGroupText>R$</InputGroupText>
                      </InputGroupAddon>
                      <NumericFormat
                        id={field.name}
                        name={field.name}
                        customInput={InputGroupInput}
                        value={field.state.value}
                        onValueChange={(values) => {
                          field.handleChange(Number(values.floatValue));
                        }}
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="Ex.: 350,00"
                      />
                    </InputGroup>
                    <FieldDescription>Valor pago.</FieldDescription>
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
                    <FieldDescription>Dia da movimentação.</FieldDescription>
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </div>
          <form.Field
            name="description"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Descrição</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Ex.: Mercado, aluguel, transporte."
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <FieldDescription>Nome que identifique a despesa.</FieldDescription>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </ResponsiveDialog>
  );
};
