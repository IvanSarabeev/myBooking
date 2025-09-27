"use server";

import { db } from "@/database/drizzle";
import { booksSchema } from "@/database/schemas/books";

/**
 * Asynchronously creates a new book entry in the database.
 *
 * @param {BookParams} parameters - An object containing the details of the book to be created.
 * @returns {Promise<Object>} A promise that resolves to an object with the result of the operation.
 * The object contains a `success` flag, a `message` string, and optionally the created book data.
 *
 * If the operation succeeds, `success` will be `true`, `message` will indicate success,
 * and `data` will hold the newly created book's details.
 *
 * If the operation fails, `success` will be `false` and `message` will indicate the failure.
 */
export const createBook = async (parameters: BookParams): Promise<object> => {
  try {
    const newBook = await db
      .insert(booksSchema)
      .values({
        ...parameters,
        availableCopies: parameters.total_copies,
      })
      .returning(); // Get the value back from the DB

    if (newBook.length === 0) {
      return {
        success: false,
        message: "An error occurred while creating the book.",
      };
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
      message: "Book created successfully",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An error occurred while creating the book.",
    };
  }
};
