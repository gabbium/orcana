import { z } from "zod";

import { TRANSACTION_KIND } from "../constants/enums";

const today = new Date();

export const listTransactionsInputSchema = z.object({
  kind: z.enum(TRANSACTION_KIND).optional(),
  month: z.number().int().min(1).max(12).default(today.getMonth() + 1),
  year: z.number().int().min(2000).default(today.getFullYear()),
});

export type ListTransactionsInput = z.infer<typeof listTransactionsInputSchema>;
