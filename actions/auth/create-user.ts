"use server";

// これ重要
import prisma from "@/lib/prisma";
import { ReturnType } from "@/type/return-type";

import { RegisterUserFormValues } from "@/app/(auth)/signup/_schema/schema";

export const createUser = async (values: Pick<RegisterUserFormValues, "id" | "email">) => {
  try {
    await prisma.user.create({ data: { ...values, name: "", role: "USER" } });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

export const updateUserName = async (values: RegisterUserFormValues): Promise<ReturnType> => {
  try {
    const user = await prisma.user.update({ data: { name: values.name }, where: { id: values.id } });
    if (user) {
      return { isSuccess: true, message: "ユーザー名の登録が完了しました" };
    } else {
      return { isSuccess: false, message: "ユーザー名の登録に失敗しました" };
    }
  } catch (error) {
    return { isSuccess: false, message: "ユーザー名の登録に失敗しました" };
  }
};
