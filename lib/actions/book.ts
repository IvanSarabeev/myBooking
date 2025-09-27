"use server";

import { borrowBookAction } from "@/database/queries/books";
import { db } from "@/database/drizzle";
import { usersSchema } from "@/database";
import { eq } from "drizzle-orm";

/**
 * Handles the borrowing of a book by a user.
 *
 * This function takes in parameters which include the required
 * book ID and user ID for the borrowing action. It validates
 * the inputs and attempts to execute the borrowing process.
 * If successful, it returns a success response. If an error
 * occurs, it will handle it and return an appropriate error message.
 *
 * @param {BorrowBookParams} parameters - The parameters containing bookId and userId.
 * @returns {Promise<{ success: boolean; data?: any; message: string; }>} A promise resolving to an object indicating the success or failure of the operation.
 */
export const borrowBook = async (
  parameters: BorrowBookParams,
): Promise<{ success: boolean; data?: any; message: string }> => {
  const { bookId, userId } = parameters;

  if (!bookId || !userId)
    return {
      success: false,
      message: "Invalid book request. Please try again.",
    };

  try {
    return await borrowBookAction(parameters);
  } catch (error: unknown) {
    return {
      success: false,
      message: "An error occurred while borrowing the book.",
    };
  }
};

/**
 * Determines whether a user is eligible to borrow a book and provides an associated message.
 *
 * @param {string} userId - The unique identifier of the user attempting to borrow a book.
 * @param {number} availableCopies - The number of available copies of the book.
 * @returns {Promise<{ isEligible: boolean, message: string } | null>} A promise that resolves to an object containing the user's eligibility status and a message,
 * or null if the user cannot be found in the database.
 */
export const canUserBorrowBook = async (
  userId: string,
  availableCopies: number,
): Promise<{ isEligible: boolean; message: string } | null> => {
  const [user] = await db
    .select()
    .from(usersSchema)
    .where(eq(usersSchema.id, userId))
    .limit(1);

  if (!user) return null;

  return {
    isEligible: availableCopies > 0 && user.status === "APPROVED",
    message:
      availableCopies <= 0
        ? "Book is not available"
        : "You are not eligible to borrow this book",
  };
};
