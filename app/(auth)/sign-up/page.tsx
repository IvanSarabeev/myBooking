"use client";

import React from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";

const defaultValues = {
  fullName: "",
  email: "",
  universityId: 0,
  universityCard: "",
  password: "",
};

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={defaultValues}
      onSubmit={signUp}
    />
  );
};
export default SignUp;
