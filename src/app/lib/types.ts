export type Player = {
  id: number;
  name: string;
  hat: number;
  photo: string;
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
