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

type MovementsIncomeFormProps = {
  onClose: () => void;
  onSubmit: (value: MovementsCreateSchema) => void;
};

export const MovementsIncomeForm = ({ onClose, onSubmit }: MovementsIncomeFormProps) => {
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
      title="Nova receita"
      description="Registre uma entrada realizada no seu orçamento."
      closeButton={
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      }
      submitButton={
        <Button
          form="movements-income-form"
          type="submit"
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Salvar receita
        </Button>
      }
    >
      <form
        id="movements-income-form"
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
                    <FieldDescription>Valor recebido.</FieldDescription>
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
                    placeholder="Ex.: Cliente X, salário, bônus."
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <FieldDescription>Nome que identifique a receita.</FieldDescription>
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
