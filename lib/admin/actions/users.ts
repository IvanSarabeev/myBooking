"use server";

import { db } from "@/database/drizzle";
import { usersSchema } from "@/database";
import { asc, desc, eq, sql } from "drizzle-orm";
import { USER_STATUS_TYPES } from "@/constants";
import { revalidatePath, unstable_cache } from "next/cache";

const STARTING_PAGE = 1;
const USER_REQUEST_LIMIT = 5;
const GET_REQUESTED_USERS_CACHE_KEY = "get-requested-users";

/**
 * Fetches a paginated, sorted list of users who have requested an account.
 *
 * @param {number} [page=1] - The current page of results to fetch. Defaults to the first page.
 * @param {"latest" | "oldest"} [sort="latest"] - The order in which results are sorted.
 * @param {number} [limit=USER_REQUEST_LIMIT] - The maximum number of users to fetch per page. Defaults to a predefined constant.
 *
 * @returns {Promise<{success: boolean, message?: string, data?: AccountRequestUser[], meta?: {page: number, limit: number, totalCount: number, totalPages: number}}>}
 * An object representing the success status, optional message, queried user data, and metadata about the pagination and result set.
 */
const _getRequestedUsers = async (
  page: number = STARTING_PAGE,
  sort: "latest" | "oldest" = "latest",
  limit: number = USER_REQUEST_LIMIT,
): Promise<{
  success: boolean;
  message?: string;
  data?: AccountRequestUser[];
  meta?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}> => {
  const offset = (page - STARTING_PAGE) * limit;
  const order =
    sort === "latest"
      ? desc(usersSchema.createdAt)
      : asc(usersSchema.createdAt);

  try {
    // @ts-ignore
    const users: AccountRequestUser[] = await db
      .select({
        id: usersSchema.id,
        fullName: usersSchema.fullName,
        email: usersSchema.email,
        universityId: usersSchema.universityId,
        status: usersSchema.status,
        createdAt: usersSchema.createdAt,
        lastActivityDate: usersSchema.lastActivityDate,
      })
      .from(usersSchema)
      .where(eq(usersSchema.status, USER_STATUS_TYPES.PENDING))
      .orderBy(order)
      .limit(limit)
      .offset(offset);

    const totalResults = await db.execute(
      sql`SELECT COUNT(*)::int AS count FROM ${usersSchema} WHERE ${usersSchema.status} = ${USER_STATUS_TYPES.PENDING}`,
    );
    const totalCount = Number(totalResults.rows?.[0]?.count ?? 0);

    return {
      success: true,
      data: users,
      meta: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An error occurred while fetching users.",
      data: [],
    };
  }
};

const cacheGetRequestedUsers = unstable_cache(
  _getRequestedUsers,
  [GET_REQUESTED_USERS_CACHE_KEY],
  {
    tags: [GET_REQUESTED_USERS_CACHE_KEY],
  },
);

export const getRequestedUsers = async (
  page: number = STARTING_PAGE,
  sort: "latest" | "oldest" = "latest",
  limit: number = USER_REQUEST_LIMIT,
  useCache: boolean = true,
): Promise<{
  success: boolean;
  message?: string;
  data?: AccountRequestUser[];
  meta?: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}> => {
  if (useCache) {
    return cacheGetRequestedUsers(page, sort, limit);
  }

  return _getRequestedUsers(page, sort, limit);
};

/**
 * Update the status of a user and revalidates a specified path on completion.
 *
 * @param {string} userId - The unique identifier of the user whose status is to be updated.
 * @param {"APPROVED" | "PENDING" | "REJECTED"} [status="REJECTED"] - The new status to assign to the user.
 * @returns {Promise<{success: boolean; message: string;}>} A promise that resolves to an object.
 */
export const changeRequestedStatus = async (
  userId: string,
  status: "APPROVED" | "PENDING" | "REJECTED" = "REJECTED",
): Promise<{ success: boolean; message: string }> => {
  if (!userId) {
    return {
      success: false,
      message: "Invalid user request. Please try again.",
    };
  }

  try {
    const updateUser = await db
      .update(usersSchema)
      .set({ status })
      .where(eq(usersSchema.id, userId))
      .returning();

    if (!updateUser.length) {
      return { success: false, message: "Failed to update user status." };
    }

    revalidatePath("/admin/account-request");

    return { success: true, message: "Operation successful." };
  } catch (error: unknown) {
    return {
      success: false,
      message: "An error occurred while changing the user status.",
    };
  }
};
