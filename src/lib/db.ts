import { Pool } from "pg";

let pool: Pool;

// Check if DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error("🔴 DATABASE_URL environment variable is not set.");
  // In a real app, you might throw an error or handle this more gracefully
  // For now, we'll let the app potentially crash later if pool is used without init
} else {
  console.log("🟢 Initializing PostgreSQL connection pool...");
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Add SSL configuration if needed for production (e.g., connecting to managed databases)
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  pool.on("connect", () => {
    console.log("🔗 PostgreSQL pool connected");
  });

  pool.on("error", (err) => {
    console.error("🔴 PostgreSQL pool error:", err);
  });
}

// Export a query function that uses the pool
export const query = async (
  text: string,
  params?: (string | number | boolean | null)[]
) => {
  if (!pool) {
    throw new Error("Database pool is not initialized. Check DATABASE_URL.");
  }
  const start = Date.now();
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query:", { text, duration, rows: res.rowCount });
    return res;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Optionally export the pool itself if needed elsewhere
// export { pool };
