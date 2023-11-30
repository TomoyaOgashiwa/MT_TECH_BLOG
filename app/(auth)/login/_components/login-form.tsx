"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { supabaseClient } from "@/lib/supabase/supabase-client";
import { generalAuthFormSchema, GeneralAuthFormValues } from "@/type/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import GeneralAuthForm from "@/components/auth/general-auth-form";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<GeneralAuthFormValues>({
    resolver: zodResolver(generalAuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: GeneralAuthFormValues) => {
    const { error } = await supabaseClient.auth.signInWithPassword(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (error) {
      return toast({
        title: "ログイン失敗",
        description: "入力したデータが正しいか確認してください",
        variant: "destructive",
      });
    }
    router.refresh();
    router.push("/");
  };
  return <GeneralAuthForm form={form} onSubmit={onSubmit} />;
};

export default LoginForm;
