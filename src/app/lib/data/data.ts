import { Player } from "@/app/lib/types";
import { sql } from "@vercel/postgres";

// Retrieve all players
export const fetchPlayers = async () => {
  return await sql<Player>`
  SELECT *
  FROM player
  ORDER BY player.id 
`;
};
