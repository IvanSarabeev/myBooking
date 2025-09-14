"use client";

import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";

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
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
