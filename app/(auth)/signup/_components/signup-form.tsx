"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createUser, updateUserName } from "@/actions/auth/create-user";
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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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

  const updateNameForm = useForm<RegisterUserFormValues>({
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
    if (error) {
      toast({
        title: "新規登録に失敗しました",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      const id = data.user?.id || "";
      const email = data.user?.email || "";
      await createUser({ id, email });
      updateNameForm.setValue("id", id);
      updateNameForm.setValue("email", email);
      setOpen(true);
    }
  };

  const onRegisterUserFormSubmit = async (values: RegisterUserFormValues) => {
    const { isSuccess, message } = await updateUserName(values);
    toast({
      title: message,
      variant: isSuccess ? "default" : "destructive",
      duration: 3000,
    });
    setOpen(false);

    if (isSuccess) {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <>
      <GeneralAuthForm form={signupForm} onSubmit={onSingupFormSubmit} />
      <Dialog open={open} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ユーザー名登録</DialogTitle>
            <DialogDescription>
              新規登録が完了しました。
              <br />
              続けてユーザー名の登録を行ってください。
            </DialogDescription>
          </DialogHeader>
          <Form {...updateNameForm}>
            <form className="grid grid-cols-4 gap-3" onSubmit={updateNameForm.handleSubmit(onRegisterUserFormSubmit)}>
              <FormField
                control={updateNameForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input placeholder="USERNAME" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">登録</Button>
            </form>
          </Form>
          <DialogFooter className="flex">
            <Button onClick={() => setOpen(false)}>
              <Link href={"/"}>登録せず記事一覧へ</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignupForm;
