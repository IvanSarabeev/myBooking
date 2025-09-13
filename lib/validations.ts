import { z } from "zod";

/**
 * The schema ensures that all required fields are provided and adhere to specific constraints.
 *
 * Structure:
 * - fullName: A string that must be between 3 and 200 characters long.
 * - email: A valid email address; this field is required.
 * - universityId: A number coerced from the input value if necessary.
 * - universityCard: A non-empty string; this field is required.
 * - password: A string that must be between 8 and 25 characters long; this field is required.
 */
export const signUpSchema = z.object({
  fullName: z.string().min(3).max(200),
  email: z.email().nonempty("Email is required"),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University card is required"),
  password: z.string().min(8).max(25).nonempty("Password is required"),
});

/**
 * Schema for user sign-in details.
 *
 * The `signInSchema` variable validates email and password fields:
 * - `email` must be a valid email address and cannot be empty.
 * - `password` must be a string between 8 and 25 characters long and cannot be empty.
 *
 * This schema ensures that the required fields are appropriately formatted and meet the specified constraints.
 */
export const signInSchema = z.object({
  email: z.email().nonempty("Email is required"),
  password: z.string().min(8).max(25).nonempty("Password is required"),
});
