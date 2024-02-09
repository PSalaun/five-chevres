"use server"

import { Player, Team } from "@/app/lib/types";
import { sql } from "@vercel/postgres";

// Retrieve all players
export const fetchPlayers = async (): Promise<Player[]> => {
  const data = await sql<Player>`
  SELECT *
  FROM player
  ORDER BY player.id 
`;
  return data.rows
};

export const createTeams = async (): Promise<[Team, Team]> => {
  const data = await sql<Team>`
  INSERT INTO team(name)
  VALUES ('teamA'), ('teamB')
  RETURNING *
`;
  return data.rows
}