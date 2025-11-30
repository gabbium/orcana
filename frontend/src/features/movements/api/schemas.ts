import { endOfMonth, startOfMonth } from "date-fns";
import z from "zod";

export type MovementDirectionSearch = "All" | "Income" | "Expense";

export const movementsSearchSchema = z.object({
  pageNumber: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  minOccurredAt: z.string().default(() => startOfMonth(new Date()).toISOString().slice(0, 10)),
  maxOccurredAt: z.string().default(() => endOfMonth(new Date()).toISOString().slice(0, 10)),
  direction: z.enum(["All", "Income", "Expense"]).default("All"),
});

export type MovementsSearchSchema = z.infer<typeof movementsSearchSchema>;
