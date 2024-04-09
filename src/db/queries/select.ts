import { sql } from "../../lib/postgres";
import { ShortLink } from "../../types/shortLinks";

async function selectShortLink(short_id: string): Promise<ShortLink | null> {
  try {
    // Select a record from the short_links table based on the short_url
    const result = await sql/* sql */ `
        SELECT * FROM short_links
        WHERE short_id = ${short_id}
        LIMIT 1
      `;

    if (!result.length) {
      return null;
    }

    return result[0][0];
  } catch (error) {
    console.error("Error retrieving short link by short URL:", error);
    throw error;
  }
}

export default selectShortLink;
