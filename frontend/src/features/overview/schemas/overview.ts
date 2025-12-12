import { z } from "zod";

const today = new Date();

export const overviewFilterSchema = z.object({
  month: z.number().int().min(1).max(12).default(today.getMonth() + 1),
  year: z.number().int().min(2000).default(today.getFullYear()),
});

export type OverviewFilter = z.infer<typeof overviewFilterSchema>;
