import { drizzle } from "drizzle-orm/neon-http";
import config from "@/lib/env.config";
import { neon } from "@neondatabase/serverless";

const {
  env: { databaseUrl },
} = config;

if (!databaseUrl) throw new Error("Database URL is not defined");

const neonSql = neon(databaseUrl);

export const db = drizzle({ client: neonSql });
