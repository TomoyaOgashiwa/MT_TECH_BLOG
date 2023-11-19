"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Database } from "@/type/database/SupabaseTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginFormSchema, LoginFormValues } from "@/app/(auth)/login/_schema/schema";

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient<Database>();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const { error } = await supabase.auth.signInWithPassword(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (error) {
      return toast({
        title: "ログイン失敗",
        description: "入力したデータが正しいか確認してください",
        variant: "destructive",
      });
    }

    router.push("/");
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="EMAIL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="PASSWORD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
