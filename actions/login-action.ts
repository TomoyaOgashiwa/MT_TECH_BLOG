"use server";

import { safeAction } from "@/lib/safe-action";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Eメールを記載してください" })
    .email({ message: "メールアドレスの表記が間違っています" }),
  password: z
    .string({ required_error: "パスワードを記載してください" })
    .min(8, { message: "8文字以上入力してください" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const loginUser = safeAction(loginFormSchema, async ({ email, password }) => {
  if (!email || !password) throw new Error("情報が不足しています");
});
