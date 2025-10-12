"use server";

import { db } from "@/database/drizzle";
import { booksSchema } from "@/database/schemas/books";
import { unstable_cache } from "next/cache";

type FilterOptions = "A-Z" | "Z-A" | "Latest" | "Oldest";

const DEFAULT_BOOK_LIMIT = 7;
const GET_BOOKS_CACHE_KEY = "get-books";

/**
 * Asynchronously creates a new book entry in the database.
 *
 * @param {BookParams} parameters - An object containing the details of the book to be created.
 * @returns {Promise<{
 *     success: boolean;
 *     data: Book[];
 *     message: string;
 * }>} A promise that resolves to an object with the result of the operation.
 * The object contains a `success` flag, a `message` string, and optionally the created book data.
 *
 * If the operation succeeds, `success` will be `true`, `message` will indicate success,
 * and `data` will hold the newly created book's details.
 *
 * If the operation fails, `success` will be `false` and `message` will indicate the failure.
 */
export const createBook = async (
  parameters: BookParams,
): Promise<{
  success: boolean;
  data?: Book;
  message: string;
}> => {
  try {
    const newBook = await db
      .insert(booksSchema)
      .values({
        ...parameters,
        availableCopies: parameters.totalCopies,
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

/**
 * Fetches a list of books from the database based on the specified filter and limit.
 *
 * The number of books returned is limited based on the `limit` parameter. If no
 * limit is provided, a default value is used.
 *
 * @param {number} [limit=DEFAULT_BOOK_LIMIT] - The maximum number of books to return.
 * @param {FilterOptions} [filter="A-Z"] - The sorting order for the books.
 * @returns {Promise<Book[]>} A promise that resolves to a list of books matching the filter and limit criteria.
 */
const _getBooks = async (
  limit: number = DEFAULT_BOOK_LIMIT,
  filter: FilterOptions = "A-Z",
): Promise<Book[]> => {
  // @ts-ignore
  return db
    .select()
    .from(booksSchema)
    .orderBy(
      filter === "A-Z"
        ? booksSchema.title
        : filter === "Z-A"
          ? booksSchema.title
          : filter === "Latest"
            ? booksSchema.createdAt
            : filter === "Oldest"
              ? booksSchema.createdAt
              : booksSchema.createdAt,
    )
    .limit(limit);
};

/**
 * Caches the result of the `_getBooks` function for improved performance and efficiency.
 *
 * @param {...*} _getBooks - The function to retrieve books data.
 * @param {Array} dependencies - Dependencies to evaluate cache computation
 */
const cacheGetBooks = unstable_cache(_getBooks, [GET_BOOKS_CACHE_KEY], {
  tags: [GET_BOOKS_CACHE_KEY],
});

/**
 * Fetches a list of books based on the specified criteria.
 * Retrieves books either from cache or directly through a retrieval method,
 * depending on the value of the `useCache` parameter.
 *
 * @param {number} [limit=DEFAULT_BOOK_LIMIT] - The maximum number of books to retrieve.
 * @param {FilterOptions} [filter="A-Z"] - The filter criterion for sorting or filtering the books.
 * @param {boolean} [useCache=true] - Specifies whether to retrieve books from the cache or fetch them directly.
 * @returns {Promise<Book[]>} A promise that resolves to an array of books.
 */
export const getBooks = async (
  limit: number = DEFAULT_BOOK_LIMIT,
  filter: FilterOptions = "A-Z",
  useCache: boolean = true,
): Promise<Book[]> => {
  if (useCache) {
    return cacheGetBooks(limit, filter);
  }

  return _getBooks(limit, filter);
};
