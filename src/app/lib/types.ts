export type Player = {
  id: number;
  name: string;
  tier: number;
  photo: string;
  victories: number;
  defeats: number;
};

export type PlayerWithAvailability = Player & {
  isAvailable: boolean;
};

export type Team = {
  id: number;
  name: string;
};
export type TeamPlayers = {
  teamId: number;
  playerId: Array<number>;
};
export type Availabiliy = {
  playerId: number;
  matchId: number;
  isAvailable: boolean;
};

export type Match = {
  id: number;
  left_team_id: number;
  right_team_id: number;
  date: Date;
  score_left_team: number;
  score_right_team: number;
};

export type Ranking = {
  player_id: number;
  victories: number;
  defeats: number;
};

