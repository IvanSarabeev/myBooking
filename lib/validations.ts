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

/**
 * Schema definition for a book object using the Zod library.
 *
 * This schema validates the structure and constraints of a book object to ensure data integrity.
 *
 * Properties:
 * - `title`: A string representing the title of the book. It must be trimmed, between 2 and 100 characters in length.
 * - `author`: A string representing the author of the book. It must be trimmed, between 2 and 100 characters in length.
 * - `genre`: A string representing the genre of the book. It must be trimmed, between 2 and 50 characters in length.
 * - `rating`: A number representing the rating of the book. It must be between 1 and 5.
 * - `totalCopies`: A number indicating the total copies available for the book. It must be at least 1.
 * - `description`: A string providing a description of the book. It must be trimmed and between 10 and 1000 characters in length.
 * - `coverUrl`: A string representing the URL of the book's cover image. It is required and must not be empty.
 * - `coverColor`: A string representing the color of the book cover in hexadecimal format. It is required, trimmed, and must be a valid hexadecimal color code (e.g., #FFFFFF).
 * - `videoUrl`: A string representing the URL of a related video for the book. It is required and must not be empty.
 * - `summary`: A string giving a summary of the book. It must be trimmed and at least 10 characters in length.
 */
export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  genre: z.string().trim().min(2).max(50),
  rating: z.coerce.number().min(1).max(5),
  total_copies: z.coerce.number().min(1),
  description: z.string().trim().min(10).max(1000),
  coverUrl: z.string().nonempty("Cover URL is required"),
  coverColor: z
    .string()
    .trim()
    .regex(/^#[0-9A-F]{6}$/i)
    .nonempty("Cover color is required"),
  videoUrl: z.string().nonempty("Video URL is required"),
  summary: z.string().trim().min(10),
}) as unknown as z.ZodType<
  {
    title: string;
    author: string;
    genre: string;
    rating: number;
    total_copies: number;
    description: string;
    coverUrl: string;
    coverColor: string;
    videoUrl: string;
    summary: string;
  },
  any,
  any
>;
