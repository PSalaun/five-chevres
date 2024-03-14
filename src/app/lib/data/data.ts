'use server';

import { sql } from '@vercel/postgres';
import {
  Availabiliy,
  Match,
  Player,
  PlayerWithAvailability,
  Team,
  TeamPlayer,
} from '@/app/lib/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Retrieve all players
export const fetchPlayers = async (): Promise<Player[]> => {
  const data = await sql<Player>`
  SELECT *
  FROM player
  ORDER BY player.id 
`;
  return data.rows;
};
export const fetchExistingTeams = async (): Promise<Team[]> => {
  const data = await sql<Team>`
  SELECT *
  FROM team
  ORDER BY team.id
`;
  //console.log(data.rows);
  return data.rows;
};

const getOrCreateAvailability = async (
  players: Player[],
  matchId: number
): Promise<PlayerWithAvailability[]> => {
  const playersWithAvailability = await Promise.all(
    players.map(async (player) => {
      const availabilityData = await sql<{
        is_available: boolean;
      }>`SELECT is_available FROM availability WHERE player_id = ${player.id} AND match_id = ${matchId}`;
      const hasAlreadyAvailabilityData = availabilityData.rowCount > 0;
      if (!hasAlreadyAvailabilityData) {
        sql`INSERT INTO availability(player_id, match_id, is_available) VALUES (${player.id}, ${matchId}, false)`;
      }
      return {
        ...player,
        isAvailable: availabilityData.rows[0]?.is_available ?? false,
      };
    })
  );
  return playersWithAvailability;
};

export const fetchPlayersAndSetAvailability = async (
  matchId: number
): Promise<PlayerWithAvailability[]> => {
  const data = await sql<PlayerWithAvailability>`
  SELECT *
  FROM player
  ORDER BY player.id 
  `;
  const players = data.rows;
  return getOrCreateAvailability(players, matchId);
};

export const putAvailability = (
  playerId: number,
  matchId: number,
  isAvailable: boolean
) => {
  sql<Availabiliy>`
  UPDATE availability
  SET is_available = ${isAvailable}
  WHERE player_id = ${playerId} AND match_id = ${matchId}
  `;
};

export const createTeams = async (): Promise<[Team, Team]> => {
  const data = await sql<Team>`
  INSERT INTO team(name)
  VALUES ('teamA'), ('teamB')
  RETURNING *
`;
  // @ts-expect-error
  return data.rows;
};
export const createTeamPlayer = async (
  players: Record<string, Array<PlayerWithAvailability>>
) => {
  const values = players
    .map((player) => `(${player.id}, ${player.tier})`)
    .join(', ');
  const query = `INSERT INTO team_player(player_id, team_id) VALUES ${values}`;
  const availability = await sql`${query}`;
};

export const createMatch = async (teams: [Team, Team], players: Player[]) => {
  const values = players
    .map((player) => `(${player.id}, ${player.tier})`)
    .join(', ');
  const query = `INSERT INTO match(left_team_id, right_team_id, date, score_left_team, score_right_team) VALUES ${values}`;
};

export const createTeamsAndPlayers = async (
  team: [Team, Team],
  data: Record<string, Array<PlayerWithAvailability>>
) => {
  const { id: id1 } = team[0];
  const { id: id2 } = team[1];
  const players1 = Object.values(data)[0];
  const players2 = Object.values(data)[1];
  const playersId1 = players1.map((item) => item.id);
  const playersId2 = players2.map((item) => item.id);
  players1.forEach(async (player) => {
    const updateTeamPlayer1 = await sql<TeamPlayer>`
    INSERT INTO team_player(team_id, player_id)
    VALUES ${id1}, ${player.id}
  `;
  });
  players2.forEach(async (player) => {
    const updateTeamPlayer1 = await sql<TeamPlayer>`
    INSERT INTO team_player(team_id, player_id)
    VALUES ${id2}, ${player.id}
  `;
  });
};

export const fetchMatches = async (): Promise<Match[]> => {
  const data = await sql<Match>`
  SELECT *
  FROM Match
  ORDER BY match.date
`;
  return data.rows;
};

export const updateScoreMatch = async (
  matchId: number,
  leftTeamScore: number,
  rightTeamScore: number
) => {
  const data = await sql<Match[]>`
  UPDATE Match
  SET score_left_team = ${leftTeamScore}, score_right_team = ${rightTeamScore}
  WHERE id = ${matchId}
  RETURNING *
`;
  return data.rows;
};
export const deleteAllTeams = async () => {
  await sql`
    DELETE FROM Team;
`;
};

export const deleteTeam = async (teamId: number) => {
  await sql`
    DELETE FROM Team WHERE id = ${teamId};
`;
};
