"use server";

import { db } from "@/database/drizzle";
import { booksSchema, borrowRecordsSchema, usersSchema } from "@/database";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

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
): Promise<{ success: boolean; message: string }> => {
  const { bookId, userId } = parameters;

  if (!bookId || !userId)
    return {
      success: false,
      message: "Invalid book request. Please try again.",
    };

  try {
    const [book] = await db
      .select({
        availableCopies: booksSchema.availableCopies,
      })
      .from(booksSchema)
      .where(eq(booksSchema.id, bookId))
      .limit(1);

    if (!book || book.availableCopies <= 0) {
      return { success: false, message: "Book is not available" };
    }

    const dueDate = dayjs().add(7, "day").format("YYYY-MM-DD");
    const returnDate = dayjs().add(14, "day").format("YYYY-MM-DD");

    const [record] = await db
      .insert(borrowRecordsSchema)
      .values({
        userId,
        bookId,
        dueDate,
        returnDate,
      })
      .returning();

    if (!record) {
      return {
        success: false,
        message: "Failed to create borrow record.",
      };
    }

    // Decrement book copies
    const updateResult = await db
      .update(booksSchema)
      .set({ availableCopies: book.availableCopies - 1 })
      .where(eq(booksSchema.id, bookId))
      .returning();

    if (!updateResult.length) {
      // (Optional) try rollback by deleting the inserted record
      await db
        .delete(borrowRecordsSchema)
        .where(eq(borrowRecordsSchema.id, record.id));
      return {
        success: false,
        message: "Failed to update book copies.",
      };
    }

    return { success: true, message: "Book borrowed successfully." };
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

  const APPROVED: UserStatus["status"] = "APPROVED";

  return {
    isEligible: availableCopies > 0 && user.status === APPROVED,
    message:
      availableCopies > 0 && user.status === "APPROVED"
        ? "Book is available"
        : "You are not eligible to borrow this book",
  };
};
