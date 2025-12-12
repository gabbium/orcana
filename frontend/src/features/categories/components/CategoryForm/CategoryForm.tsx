import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/ui/Button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/NativeSelect";
import { Skeleton } from "@/components/ui/Skeleton";

import { CATEGORY_KIND, type CategoryKind } from "../../constants/enums";
import { categoryFormSchema, type CategoryFormSchema } from "../../schemas/category";

export type CategoryFormProps = {
  defaultValues?: Partial<CategoryFormSchema>;
  onSubmit: (value: CategoryFormSchema) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export const CategoryForm = ({
  defaultValues = {
    kind: undefined,
    name: "",
    icon: "",
    color: "#000000",
  },
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CategoryFormProps) => {
  const form = useForm({
    defaultValues: defaultValues as CategoryFormSchema,
    validators: {
      onSubmit: categoryFormSchema,
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
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value as CategoryKind)}
                    aria-invalid={isInvalid}
                  >
                    <NativeSelectOption value="">Selecione um tipo</NativeSelectOption>
                    <NativeSelectOption value={CATEGORY_KIND.EXPENSE}>Despesa</NativeSelectOption>
                    <NativeSelectOption value={CATEGORY_KIND.INCOME}>Receita</NativeSelectOption>
                  </NativeSelect>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />

          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Nome</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Ex.: Lazer"
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
                  <Field>
                    <FieldLabel htmlFor={field.name}>Ícone</FieldLabel>
                    <Input
                      type="text"
                      placeholder="Ex.: 🍔"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />

            <form.Field
              name="color"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Cor</FieldLabel>
                    <Input
                      type="color"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            />
          </div>
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

export const CategoryFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="flex gap-2 pt-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
};
