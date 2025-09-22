"use client";

import { FC } from "react";
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

const SignUp: FC = () => {
  /**
   * Asynchronous function to handle sign-up logic for the application.
   *
   * @param {typeof defaultValues} data - The input data required for the sign-up process.
   * @returns {Promise<{ success: boolean, error?: string } | { success: false, error: any }>} - A promise resolving to an object indicating success or failure of the sign-up operation. Success responses include an optional error message, while failure responses provide details about the error.
   * @throws {Error} - Throws an error if the sign-up process encounters an exception.
   */
  const handleSignUp = async (
    data: typeof defaultValues,
  ): Promise<
    { success: boolean; error?: string } | { success: false; error: any }
  > => {
    try {
      const response = await signUp(data);

      return response as { success: boolean; error?: string };
    } catch (error: unknown) {
      return error as { success: false; error: any };
    }
  };

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={defaultValues}
      onSubmit={handleSignUp}
    />
  );
};
export default SignUp;
