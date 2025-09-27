import { db } from "@/database/drizzle";
import { booksSchema } from "@/database";
import { desc } from "drizzle-orm";

/**
 * Retrieves the latest books from the database.
 *
 * @param {number} [limit=10] - The maximum number of books to retrieve. Defaults to 10 if not provided.
 * @returns {Promise<Book[]>} A promise that resolves to an array of the latest books, ordered by their creation date in descending order.
 */
export const getLatestBooks = async (limit: number = 10): Promise<Book[]> => {
  return db
    .select()
    .from(booksSchema)
    .limit(limit)
    .orderBy(desc(booksSchema.createdAt)) as Promise<Book[]>;
};
