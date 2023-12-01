import { z } from "zod";

// Eメール、パスワードとオーソドックスな認証のZod定義
export const generalAuthFormSchema = z.object({
  email: z
    .string({ required_error: "必須項目です", invalid_type_error: "入力値に誤りがります" })
    .email({ message: "Eメールを記載してください" }),
  password: z
    .string({ required_error: "パスワードを記載してください" })
    .min(8, { message: "8文字以上入力してください" }),
});

export type GeneralAuthFormValues = z.infer<typeof generalAuthFormSchema>;
