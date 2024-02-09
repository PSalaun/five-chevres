import { fetchPlayers } from "@/app/lib/data/data";
import { Player } from "@/app/lib/types";
import PlayerList from "@/app/players/component/PlayerList";
import NewPlayerCard from "@/app/players/component/newPlayerCard";
import PlayerCard from "@/app/players/component/playerCard";
import { useState } from "react";

async function Players() {
  const playerList = await fetchPlayers();
  console.log(playerList);
  console.log(playerList.rows);
  return (
    <div className="page-container">
      <h1 className="page-title"> Joueurs</h1>
      <PlayerList playerList={playerList.rows} />
    </div>
  );
}
export default Players;
