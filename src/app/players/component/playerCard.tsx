"use client";

import { Player } from "@/app/players/page";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  return (
    <div className="user-card">
      <div className="user-pic"></div>
      <div>
        <h2>{player.name}</h2>
        <p>Chapeau: {player.hat}</p>
      </div>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );
};

export default PlayerCard;
