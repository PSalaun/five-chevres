"use client";

import StyCard from "@/app/components/StyCard";
import { deletePlayer } from "@/app/lib/actions";
import { Player } from "@/app/lib/types";
import EditPlayerModal from "@/app/players/component/EditPlayerModal";
import { useState } from "react";

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const [editState, setEditState] = useState(false);
  const onDelete = (e: React.MouseEventHandler<HTMLButtonElement>) => {
    console.log(player);
    deletePlayer(player);
  };
  return (
    <StyCard>
      {editState && <EditPlayerModal />}
      <div className="user-pic"></div>
      <div>
        <p>{player.id}</p>
        <h2>{player.name}</h2>
        <p>Chapeau: {player.tier}</p>
      </div>
      <button>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </StyCard>
  );
};

export default PlayerCard;
