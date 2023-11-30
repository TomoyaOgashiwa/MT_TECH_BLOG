import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { createUser } from "@/actions/auth/create-user";
import { supabaseClient } from "@/lib/supabase/supabase-client";
import { generalAuthFormSchema, GeneralAuthFormValues } from "@/type/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import GeneralAuthForm from "@/components/auth/general-auth-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { registerUserFormSchema, RegisterUserFormValues } from "../_schema/schema";

const SignupForm = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const signupForm = useForm<GeneralAuthFormValues>({
    resolver: zodResolver(generalAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { register, setValue, handleSubmit } = useForm<RegisterUserFormValues>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  const onSingupFormSubmit = async (values: GeneralAuthFormValues) => {
    const { data, error } = await supabaseClient.auth.signUp(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (error) {
      toast({
        title: "新規登録に失敗しました",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setValue("id", data.user?.id || "");
      setValue("email", data.user?.email || "");
    }
  };

  const onRegisterUserFormSubmit = async (values: RegisterUserFormValues) => {
    const { isSuccess, message } = await createUser(values);
    toast({
      title: message,
      variant: isSuccess ? "destructive" : "default",
      duration: 2000,
    });

    if (isSuccess) {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <GeneralAuthForm form={signupForm} onSubmit={onSingupFormSubmit} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
          <DialogTitle>ユーザー名登録</DialogTitle>
          <DialogDescription>
            新規登録が完了しました。
            <br />
            続けてユーザー名の登録を行ってください。
          </DialogDescription>
        </DialogHeader>
        <DialogContent className="flex">
          <Input {...register("name")} placeholder="Username" />
          <Button onClick={() => handleSubmit(onRegisterUserFormSubmit)}>登録</Button>
        </DialogContent>
        <DialogFooter className="flex">
          <Button>登録せず記事一覧へ</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default SignupForm;
