"use server";

import { usersSchema } from "@/database/schemas/users";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { db } from "@/database/drizzle";
import { signIn } from "@/auth";
import { headers } from "next/headers";
import ratelimiter from "@/lib/ratelimiter";
import { redirect } from "next/navigation";

const DEFAULT_IP_ADDRESS = "127.0.0.1";

/**
 * Handles user sign-in using email and password credentials.
 *
 * @param {Object} parameters - The object containing authentication credentials.
 * @param {string} parameters.email - The user's email address.
 * @param {string} parameters.password - The user's password.
 *
 * @returns {Promise<Object>} Resolves to an object indicating the result of the sign-in attempt.
 * @returns {boolean} returns.success - Indicates if the sign-in operation was successful.
 * @returns {string | undefined} returns.error - Contains the error message if the sign-in operation fails.
 */
export const signInWithCredentials = async (
  parameters: Pick<AuthCredentials, "email" | "password">,
): Promise<object> => {
  const { email, password } = parameters;

  await validateRequestRateLimit();

  try {
    const authenticateResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (authenticateResult?.error) {
      return { success: false, error: authenticateResult.error };
    }

    return { success: true };
  } catch (error: any) {
    console.error(`Signing error: ${error}`);

    return { success: false, error: "Signing error" };
  }
};

/**
 * Handles user registration by creating a new account with the provided credentials.
 * Verifies that the user does not already exist, hashes the provided password,
 * and saves the new user's details into the database.
 * Also initiates a sign-in process upon successful registration.
 *
 * @param {AuthCredentials} parameters - An object containing user credentials.
 * @param {string} parameters.email - The email address of the user.
 * @param {string} parameters.password - The password for the account.
 * @param {string} parameters.fullName - The full name of the user.
 * @param {string} parameters.universityId - The identifier of the user's university.
 * @param {string} parameters.universityCard - The university card details of the user.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object indicating the
 * success or failure of the signup process.
 * @returns {boolean} return.success - Indicates whether the signup was successful.
 * @returns {string} [return.error] - Provides an error message in case of failure.
 */
export const signUp = async (parameters: AuthCredentials): Promise<object> => {
  const { email, password, fullName, universityId, universityCard } =
    parameters;

  await validateRequestRateLimit();

  try {
    const existingUser = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = await hash(password, 12);

    // @ts-ignore
    await db.insert(usersSchema).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error: any) {
    console.error(`Signup error: ${error}`);

    return { success: false, error: "Signup error" };
  }
};

/**
 * Checks and enforces the rate limit for a given user's IP address.
 *
 * @param {string} userIp - The IP address of the user for which the rate limit is being checked.
 * @throws {Error} If the rate limit has been exceeded for the specified IP address.
 * @returns {Promise<void>} Resolves successfully if the request is allowed, or throws an error if rate limit is exceeded.
 */
const checkRateLimit = async (userIp: string): Promise<void> => {
  const { success } = await ratelimiter.limit(userIp);

  if (!success) {
    throw new Error("Too many attempts. Please try again in a few minutes");
  }
};

/**
 * Validates user request against rate limiting and redirects if necessary
 * @returns {Promise<Response | undefined>} Redirect response if rate-limited, undefined otherwise
 */

const validateRequestRateLimit = async (): Promise<Response | undefined> => {
  try {
    const userIp =
      (await headers()).get("x-forwarded-for") || DEFAULT_IP_ADDRESS;

    await checkRateLimit(userIp);
    return undefined;
  } catch (error: unknown) {
    return redirect("/rate-limit");
  }
};
