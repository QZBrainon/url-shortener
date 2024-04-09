import postgres from "postgres";

export const sql = postgres(
  "postgresql://admin:admin@postgresql:5432/shortlinks"
);
