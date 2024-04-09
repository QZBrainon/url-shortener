import { sql } from "../../lib/postgres";
import { ShortLink } from "../../types/shortLinks";

async function insertShortLink(
  originalUrl: string,
  shortId: string
): Promise<ShortLink | null> {
  try {
    // Insert a new record into the short_links table
    const result = await sql/* sql */ `
        INSERT INTO short_links (original_url, short_id)
        VALUES (${originalUrl}, ${shortId})
      `;
    if (!result.length) {
      return null;
    }
    console.log("Short link inserted successfully");
    return result[0][0];
  } catch (error) {
    console.error("Error inserting short link:", error);
    throw error;
  }
}

export default insertShortLink;
