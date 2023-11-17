import React from "react";
import { Metadata } from "next";

import LoginForm from "./_components/login-form";

export const metadata: Metadata = {
  title: "ログイン画面",
};

const page = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
