import { z } from "zod";

import { CATEGORY_KIND } from "../constants/enums";

export const getCategoriesInputSchema = z.object({
  kind: z.enum(CATEGORY_KIND).default(CATEGORY_KIND.EXPENSE),
});

export type GetCategoriesInput = z.infer<typeof getCategoriesInputSchema>;
