"use client";

import { deletePlayer } from "@/app/lib/actions";
import { Player } from "@/app/lib/types";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  // const onDelete = (e: React.MouseEventHandler<HTMLButtonElement>) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   deletePlayer(value);
  // };
  return (
    <div className="user-card">
      <div className="user-pic"></div>
      <div>
        <p>{player.id}</p>
        <h2>{player.name}</h2>
        <p>Chapeau: {player.tier}</p>
      </div>
      <button>Edit</button>
      {/* <button onClick={deletePlayer(player)}>Delete</button> */}
    </div>
  );
};

export default PlayerCard;
