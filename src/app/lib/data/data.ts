"use server"

import { Availabiliy, Player, PlayerWithAvailability, Team } from "@/app/lib/types";
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

const getOrCreateAvailability = async (players: Player[], matchId: number): Promise<PlayerWithAvailability[]> => {
  const playersWithAvailability = await Promise.all(players.map( async (player) => {
    const availabilityData = await sql<{ is_available: boolean}>`SELECT is_available FROM availability WHERE player_id = ${player.id} AND match_id = ${matchId}`;
    const hasAlreadyAvailabilityData = availabilityData.rowCount > 0;
    if (!hasAlreadyAvailabilityData) {
      sql`INSERT INTO availability(player_id, match_id, is_available) VALUES (${player.id}, ${matchId}, false)`;
    }
    return { ...player, isAvailable: availabilityData.rows[0]?.is_available ?? false }
  }))
  return playersWithAvailability
}

export const fetchPlayersAndSetAvailability = async (matchId: number): Promise<PlayerWithAvailability[]> => {
  const data = await sql<PlayerWithAvailability>`
  SELECT *
  FROM player
  ORDER BY player.id 
  `;
  const players = data.rows
  return getOrCreateAvailability(players, matchId)
};

export const putAvailability = (playerId: number, matchId: number, isAvailable: boolean) => {
  sql<Availabiliy>`
  UPDATE availability
  SET is_available = ${isAvailable}
  WHERE player_id = ${playerId} AND match_id = ${matchId}
  `;
}

export const createTeams = async (): Promise<[Team, Team]> => {
  const data = await sql<Team>`
  INSERT INTO team(name)
  VALUES ('teamA'), ('teamB')
  RETURNING *
`;
  // @ts-expect-error
  return data.rows
}

export const createMatch = async (datetime: string): Promise<number> => {
  const data = await sql<{ id: number }>`
  INSERT INTO match(date)
  VALUES (${datetime}::timestamp)
  RETURNING id
`;
  return data.rows[0].id
}