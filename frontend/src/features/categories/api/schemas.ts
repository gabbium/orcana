import z from "zod";

export const categoriesSearchSchema = z.object({
  pageNumber: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
  name: z.string().optional(),
  kind: z.string().optional(),
  status: z.string().optional(),
});

export type CategoriesSearchSchema = z.infer<typeof categoriesSearchSchema>;
