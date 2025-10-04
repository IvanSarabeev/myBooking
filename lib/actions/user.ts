"use server";

import { db } from "@/database/drizzle";
import { booksSchema, borrowRecordsSchema } from "@/database";
import { and, desc, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

const BORROWED_BOOKS_LIMIT = 10;
const BORROWED_BOOKS_CACHE_KEY = "borrowed-books";

const BORROWED: BorrowBookStatus["status"] = "BORROWED";

const _getBorrowedBooks = async (
  userId: string,
  limit: number = BORROWED_BOOKS_LIMIT,
): Promise<BorrowedBooks[]> => {
  return db
    .select({
      id: borrowRecordsSchema.id,
      borrowDate: borrowRecordsSchema.borrowDate,
      dueDate: borrowRecordsSchema.dueDate,
      returnDate: borrowRecordsSchema.returnDate,
      status: borrowRecordsSchema.status,
      books: {
        id: booksSchema.id,
        title: booksSchema.title,
        genre: booksSchema.genre,
        coverUrl: booksSchema.coverUrl,
        coverColor: booksSchema.coverColor,
      },
    })
    .from(borrowRecordsSchema)
    .innerJoin(booksSchema, eq(borrowRecordsSchema.bookId, booksSchema.id))
    .where(
      and(
        eq(borrowRecordsSchema.userId, userId),
        eq(borrowRecordsSchema.status, BORROWED),
      ),
    )
    .orderBy(desc(borrowRecordsSchema.borrowDate))
    .limit(limit);
};

const cacheGetBorrowedBooks = unstable_cache(
  _getBorrowedBooks,
  [BORROWED_BOOKS_CACHE_KEY],
  { tags: [BORROWED_BOOKS_CACHE_KEY] },
);

export const getBorrowedBooks = async (
  userId: string,
  limit: number = BORROWED_BOOKS_LIMIT,
  useCache: boolean = true,
): Promise<BorrowedBooks[]> => {
  if (useCache) {
    return cacheGetBorrowedBooks(userId, limit);
  }

  return _getBorrowedBooks(userId, limit);
};

export const revalidateBorrowedBooksCache = async () => {
  return revalidateTag(BORROWED_BOOKS_CACHE_KEY);
};
