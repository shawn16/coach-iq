/**
 * Database Utility
 *
 * Provides a singleton instance of the database client.
 * Uses Kysely for type-safe SQL queries.
 */

import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "@/types/db";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const db = new Kysely<DB>({
  dialect,
});
