import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

import { CATEGORY_KIND, type CategoryKind } from "../../constants/enums";

const categoryFormSchema = z.object({
  kind: z.enum(CATEGORY_KIND),
  name: z.string().min(1, "Nome é obrigatório."),
  icon: z.string(),
  color: z.string(),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;

export type CategoryFormProps = {
  kind: CategoryKind;
  onSubmit: (value: CategoryFormSchema) => void;
  initialValues?: Partial<CategoryFormSchema>;
};

export const CategoryForm = ({
  kind = CATEGORY_KIND.EXPENSE,
  onSubmit,
  initialValues,
}: CategoryFormProps) => {
  const form = useForm({
    defaultValues: {
      kind: kind,
      name: initialValues?.name ?? "",
      icon: initialValues?.icon ?? "",
      color: initialValues?.color ?? "#3584e4",
    } as CategoryFormSchema,
    validators: {
      onSubmit: categoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      id="category-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup className="text-sm">
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
            children={(field) => (
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
              </Field>
            )}
          />

          <form.Field
            name="color"
            children={(field) => (
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
              </Field>
            )}
          />
        </div>
      </FieldGroup>
    </form>
  );
};
