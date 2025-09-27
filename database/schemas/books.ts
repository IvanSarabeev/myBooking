import {
  uuid,
  pgTable,
  varchar,
  text,
  integer,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const booksSchema = pgTable("books", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  title: varchar("title", { length: 150 }).notNull(),
  author: varchar("author", { length: 50 }).notNull(),
  genre: varchar("genre", { length: 25 }).notNull(),
  rating: real("rating").notNull(),
  coverUrl: text("cover_url").notNull(),
  coverColor: varchar("cover_color", { length: 7 }).notNull(),
  videoUrl: text("video_url").notNull(),
  description: text("description").notNull(),
  summary: varchar("summary", { length: 500 }).notNull(),
  totalCopies: integer("total_copies").notNull().default(1),
  availableCopies: integer("available_copies").notNull().default(0),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
