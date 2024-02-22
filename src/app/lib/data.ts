import { Match, Player, Ranking } from "@/app/lib/types";
import { sql } from "@vercel/postgres";

export const fetchPlayers = async () => {
  return await sql<Player>`
  SELECT *
  FROM player
  ORDER BY player.name
`;
};
// TODO : test later
// export const fetchMatches = async () => {
//   return await sql`
//   SELECT *
//   FROM match
//   ORDER BY match.id
// `;
// };
export const fetchMatches = (): Match[] => {
  const fakeMatch = [
    {
      id: 1,
      left_team_id: 1,
      right_team_id: 2,
      date: new Date(),
      score_left_team: 0,
      score_right_team: 0,
    },
    {
      id: 1,
      left_team_id: 1,
      right_team_id: 2,
      date: new Date(),
      score_left_team: 0,
      score_right_team: 0,
    },
    ,
    {
      id: 1,
      left_team_id: 1,
      right_team_id: 2,
      date: new Date(),
      score_left_team: 0,
      score_right_team: 0,
    },
  ];
  /* @ts-expect-error */
  return fakeMatch;
};
// TODO : test later
// export const fetchRanking = async () => {
//   return await sql`
//   SELECT id, victories, defeats
//   FROM player
//   ORDER BY victories DESC
// `;
// };
export const fetchRanking = (): Ranking[] => {
  const fakeRanks = [
    {
      player_id: 1,
      defeats: Math.round(Math.random() * 10),
      victories: Math.round(Math.random() * 10),
    },
    {
      player_id: 2,
      defeats: Math.round(Math.random() * 10),
      victories: Math.round(Math.random() * 10),
    },
    {
      player_id: 3,
      defeats: Math.round(Math.random() * 10),
      victories: Math.round(Math.random() * 10),
    },
    {
      player_id: 4,
      defeats: Math.round(Math.random() * 10),
      victories: Math.round(Math.random() * 10),
    },
    {
      player_id: 5,
      defeats: Math.round(Math.random() * 10),
      victories: Math.round(Math.random() * 10),
    },
  ];
  return fakeRanks;
};

export const fetchUser = (): Player => {
  return {
    id: 1,
    name: "test",
    tier: 1,
    photo: "test",
    victories: 0,
    defeats: 0,
  };
};
