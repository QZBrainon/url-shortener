import { sql } from "../lib/postgres";

async function migrate(): Promise<void> {
  await sql/* sql */ `CREATE TABLE IF NOT EXISTS short_links (
    id SERIAL PRIMARY KEY,
    short_id TEXT UNIQUE,
    original_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`;

  await sql.end();
  console.log("Migration applied");
}

migrate();
