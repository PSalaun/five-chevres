<<<<<<< Updated upstream
"use client";

=======
import { fetchPlayers } from "@/app/lib/data/data";
import { Player } from "@/app/lib/types";
import PlayerList from "@/app/players/component/PlayerList";
>>>>>>> Stashed changes
import NewPlayerCard from "@/app/players/component/newPlayerCard";
import PlayerCard from "@/app/players/component/playerCard";
import { useState } from "react";

<<<<<<< Updated upstream
export type Player = {
  id: number;
  name: string;
  hat: number;
  profilPicture: string;
};

const Players = () => {
  const [playerList, setPlayerList] = useState<Player[]>([
    {
      id: 0,
      name: "Jane",
      hat: 1,
      profilPicture: "1",
    },
    {
      id: 1,
      name: "John",
      hat: 1,
      profilPicture: "2",
    },
    {
      id: 2,
      name: "Janne",
      hat: 3,
      profilPicture: "2",
    },
  ]);

  const handleFormSubmit = (player: Player) => {
    // Effectuez ici le traitement souhaité avec les données du formulaire
    console.log("Données soumises :", player);
    player.id = Math.floor(Math.random() * 1000);
    setPlayerList([...playerList, player]);
    console.log(playerList);
  };

  return (
    <div className="page-container">
      <h1 className="page-title"> Joueurs</h1>

      <div className="user-list">
        <NewPlayerCard onSubmit={handleFormSubmit} />

        {playerList.map((p: Player) => {
          return (
            <div key={p.id}>
              <PlayerCard player={p} />
            </div>
          );
        })}
      </div>
=======
async function Players() {
  const playerList = await fetchPlayers();
  console.log(playerList);
  console.log(playerList.rows);
  return (
    <div className="page-container">
      <h1 className="page-title"> Joueurs</h1>
      <PlayerList playerList={playerList.rows} />
>>>>>>> Stashed changes
    </div>
  );
};
export default Players;
