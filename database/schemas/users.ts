import {
  uuid,
  pgTable,
  varchar,
  text,
  integer,
  date,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

const STATUS_ENUM = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);

const ROLE_ENUM = pgEnum("role", ["ADMIN", "USER"]);

const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "PENDING",
  "RETURNED",
]);

export const usersSchema = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
  lastActivityDate: date("last_activity_date").defaultNow(),
});
