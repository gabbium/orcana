import z from "zod";

export const MovementsSearchDirection = {
  All: "All",
  Income: "Income",
  Expense: "Expense",
};

export type MovementsSearchDirection =
  (typeof MovementsSearchDirection)[keyof typeof MovementsSearchDirection];

export const movementsSearchSchema = z.object({
  pageNumber: z.number().default(1),
  pageSize: z.number().default(20),
  month: z.coerce.number().int().min(1).max(12).default(11),
  year: z.coerce.number().int().min(2000).max(2100).default(2025),
  direction: z.enum(MovementsSearchDirection).default(MovementsSearchDirection.All),
});

export type MovementsSearchSchema = z.infer<typeof movementsSearchSchema>;
