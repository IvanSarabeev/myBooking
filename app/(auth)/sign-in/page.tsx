"use client";

import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signInSchema } from "@/lib/validations";

const defaultValues = {
  email: "",
  password: "",
};

const SignIn = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={defaultValues}
      onSubmit={() => {}}
    />
  );
};

export default SignIn;
