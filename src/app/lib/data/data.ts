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

export const fetchPlayersAndSetAvailability = async (matchId: number): Promise<Player[]> => {
  console.log({ matchId })
  const data = await sql<Player>`
  SELECT *
  FROM player
  ORDER BY player.id 
`;
  const players = data.rows
  const values = players.map(player => `(${player.id}, ${matchId}, false)`).join(', ')
  const query = `INSERT INTO availability(player_id, match_id, is_available) VALUES ${values}`;
  const availability = await sql`${query}`;
  return players.map(player => ({ ...player, isAvailable: false }))
};

export const createTeams = async (): Promise<[Team, Team]> => {
  const data = await sql<Team>`
  INSERT INTO team(name)
  VALUES ('teamA'), ('teamB')
  RETURNING *
`;
  // @ts-expect-error
  return data.rows
}