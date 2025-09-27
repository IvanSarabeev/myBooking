import { date, pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { booksSchema, usersSchema } from "@/database";

const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "PENDING",
  "RETURNED",
]);

export const borrowRecordsSchema = pgTable("borrow_records", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .references(() => usersSchema.id)
    .notNull(),
  bookId: uuid("book_id")
    .references(() => booksSchema.id)
    .notNull(),
  borrowDate: timestamp("borrow_date", { withTimezone: true })
    .defaultNow()
    .notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date"),
  status: BORROW_STATUS_ENUM("status").default("BORROWED").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
