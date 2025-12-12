import { z } from "zod";

import { TRANSACTION_KIND, TRANSACTION_STATUS } from "../constants/enums";

export const transactionFormSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  icon: z.string().min(1, "Ícone é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  date: z.string().min(1, "Data é obrigatória"),
  amount: z.number().min(0.01, "Valor deve ser maior que 0"),
  kind: z.enum(TRANSACTION_KIND),
  status: z.enum(TRANSACTION_STATUS),
});

export type TransactionFormSchema = z.infer<typeof transactionFormSchema>;
