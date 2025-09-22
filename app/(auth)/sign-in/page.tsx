"use client";

import { FC } from "react";
import AuthForm from "@/components/forms/AuthForm";
import { signInSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";

const defaultValues = {
  email: "",
  password: "",
};

const SignIn: FC = () => {
  /**
   * Asynchronous function to handle the submission of form data.
   *
   * @param {typeof defaultValues} data - The input data that will be processed for submission.
   * @returns {Promise<{ success: boolean; error?: string } | { success: false; error: any }>}
   * Resolves to an object representing either the success or failure of the submission.
   */
  const handleSubmit = async (
    data: typeof defaultValues,
  ): Promise<
    { success: boolean; error?: string } | { success: false; error: any }
  > => {
    try {
      const response = await signInWithCredentials(data);

      return response as { success: boolean; error?: string };
    } catch (error: unknown) {
      return error as { success: false; error: any };
    }
  };

  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
    />
  );
};

export default SignIn;
