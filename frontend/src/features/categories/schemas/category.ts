import { z } from "zod";

import { CATEGORY_KIND } from "../constants/enums";

export const categoryFormSchema = z.object({
  kind: z.enum(CATEGORY_KIND, {
    message: "Tipo é obrigatório.",
  }),
  name: z.string().min(1, "Nome é obrigatório."),
  icon: z.string().min(1, "Ícone é obrigatório."),
  color: z.string().min(1, "Cor é obrigatório."),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
