import { db } from "@/database/drizzle";
import { booksSchema } from "@/database";
import { desc } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

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
