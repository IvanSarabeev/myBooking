import { db } from "@/database/drizzle";
import { booksSchema, borrowRecordsSchema } from "@/database";
import { desc, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";
import dayjs from "dayjs";
import { bookSchema } from "@/lib/validations";

const LATEST_BOOKS_LIMIT = 10;
const LATEST_BOOKS_CACHE_KEY = "latest-books";

/**
 * Retrieves the latest books from the database.
 *
 * @param {number} [limit=10] - The maximum number of books to retrieve. Defaults to 10 if not provided.
 * @returns {Promise<Book[]>} A promise that resolves to an array of the latest books, ordered by their creation date in descending order.
 */
const _getLatestBooks = async (
  limit: number = LATEST_BOOKS_LIMIT,
): Promise<Book[]> => {
  return db
    .select()
    .from(booksSchema)
    .limit(limit)
    .orderBy(desc(booksSchema.createdAt)) as Promise<Book[]>;
};

/**
 * A cached function designed to retrieve the latest books by using unstable caching mechanisms.
 *
 * @param {Function} _getLatestBooks - The function responsible for fetching the latest books.
 * @param {Array<string>} ["latest-books"] - The cache key used to uniquely identify this cache entry.
 * @param {Object} options - Configuration options for the cache behavior.
 * @param {Array<string>} options.tags - Tags used to manually revalidate this cache entry.
 */
const cacheGetLatestBooks = unstable_cache(
  _getLatestBooks,
  [LATEST_BOOKS_CACHE_KEY],
  { tags: [LATEST_BOOKS_CACHE_KEY] }, // tag for a manual revalidation
);

/**
 * Fetches the latest books with optional caching and limit configuration.
 *
 * @param {number} [limit=10] - The maximum number of latest books to retrieve. Defaults to 10 if not provided.
 * @param {boolean} [useCache=true] - Indicates whether to use cached results. Defaults to true.
 * @returns {Promise<Book[]>} A promise that resolves to an array of the latest books.
 */
export const getLatestBooks = async (
  limit: number = LATEST_BOOKS_LIMIT,
  useCache: boolean = true,
): Promise<Book[]> => {
  if (useCache) {
    return cacheGetLatestBooks(limit);
  }

  return _getLatestBooks(limit);
};

/**
 * A function to invalidate or revalidate the cache for the 'latest-books' tag.
 * This ensures that the latest books data gets updated from the source,
 * and any cached entries related to 'latest-books' are refreshed.
 */
export const invalidateLatestBookCache = () => {
  revalidateTag(LATEST_BOOKS_CACHE_KEY);
};

/**
 * Fetches a book from the database by its unique identifier.
 *
 * @param {string} id - The unique identifier of the book to fetch.
 * @returns {Promise<Book|undefined>} A promise that resolves to the book object
 * if found or an empty array if no matching record exists.
 */
export const getBookById = async (id: string): Promise<Book | undefined> => {
  if (!id) return;

  const book = await db
    .select()
    .from(booksSchema)
    .where(eq(booksSchema.id, id))
    .limit(1);

  return book[0] as Book | undefined;
};

/**
 * Handles the action of borrowing a book by a user.
 *
 * @param {BorrowBookParams} parameters - An object containing the parameters required for borrowing a book.
 * @param {string} parameters.bookId - The ID of the book being borrowed.
 * @param {string} parameters.userId - The ID of the user borrowing the book.
 * @returns {Promise<{ success: boolean; data?: any; message: string }>} An object indicating whether the book was successfully borrowed.
 */
export const borrowBookAction = async (
  parameters: BorrowBookParams,
): Promise<{ success: boolean; data?: any; message: string }> => {
  const { bookId, userId } = parameters;

  const borrowBookResult = await db
    .select({
      availableCopies: booksSchema.availableCopies,
    })
    .from(booksSchema)
    .where(eq(booksSchema.id, bookId))
    .limit(1);

  if (!borrowBookResult.length || borrowBookResult[0].availableCopies !== 0) {
    return {
      success: false,
      message: "Book is not available",
    };
  }

  const dueData = dayjs().add(7, "day").toDate();

  // @ts-ignore
  const record = db.insert(borrowRecordsSchema).values({
    userId,
    bookId,
    dueData,
    status: "BORROWED",
  });

  await db
    .update(booksSchema)
    .set({ availableCopies: borrowBookResult[0].availableCopies - 1 })
    .where(eq(booksSchema.id, bookId));

  return {
    success: true,
    data: JSON.parse(JSON.stringify(record)),
    message: "Borrowed successfully",
  };
};
