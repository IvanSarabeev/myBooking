"use server";

import { db } from "@/database/drizzle";
import { booksSchema, borrowRecordsSchema, usersSchema } from "@/database";
import { and, desc, eq } from "drizzle-orm";
import { revalidateTag, unstable_cache } from "next/cache";

const BORROWED_BOOKS_LIMIT = 10;
const BORROWED_BOOKS_CACHE_KEY = "borrowed-books";

const USER_PROFILE_CACHE_KEY = "user-profile";

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

/**
 * Fetches a user by their unique identifier and returns a partial representation of the user object.
 *
 * @param {string} userId - The unique identifier of the user to retrieve.
 * @returns {Promise<Omit<User, "password"> | null>} A promise that resolves to a partial user object containing selected properties
 * of the user or null if the user is not found or if the userId is not provided.
 */
const _getUserById = async (
  userId: string,
): Promise<Omit<User, "id" | "password" | "lastActivityDate"> | null> => {
  if (!userId) {
    return null;
  }

  const [user] = await db
    .select({
      email: usersSchema.email,
      fullName: usersSchema.fullName,
      universityId: usersSchema.universityId,
      status: usersSchema.status,
      role: usersSchema.role,
      createdAt: usersSchema.createdAt,
    })
    .from(usersSchema)
    .where(eq(usersSchema.id, userId))
    .limit(1);

  if (!user) {
    return null;
  }

  return user;
};

const cacheGetUserById = unstable_cache(
  _getUserById,
  [USER_PROFILE_CACHE_KEY],
  { tags: [USER_PROFILE_CACHE_KEY] },
);

export const getUserById = async (userId: string, useCache: boolean = true) => {
  if (useCache) {
    return cacheGetUserById(userId);
  }

  return _getUserById(userId);
};
