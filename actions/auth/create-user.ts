import { RegisterUserFormValues } from "@/app/(auth)/signup/_schema/schema";
import prisma from "@/lib/prisma";
import { ReturnType } from "@/type/return-type";

export const createUser = async(values: RegisterUserFormValues): Promise<ReturnType> => {
  try {
    const user = await prisma.user.create({data: {...values, role: 'USER'}})
    if(user){
      return {isSuccess: true, message: 'ユーザー名の登録が完了しました'}
    }else{
      return {isSuccess: false, message: 'ユーザー名の登録に失敗しました'}
    }
  } catch (error) {
    return {isSuccess: false, message: 'ユーザー名の登録に失敗しました'}
  }
}