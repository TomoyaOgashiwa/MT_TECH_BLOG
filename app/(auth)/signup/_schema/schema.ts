import { z } from "zod";

export const registerUserFormSchema = z.object({
  id: z.string({ required_error: "IDがセットされていません" }),
  name: z
  .string({ required_error: "ユーザー名を記入してください" }),
  email: z
    .string({ invalid_type_error: "入力値に誤りがります" })
    .email({ message: "Eメールがセットされていません" })
});

export type RegisterUserFormValues = z.infer<typeof registerUserFormSchema>;