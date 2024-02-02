"use client";

import NewPlayerCard from "@/app/players/component/newPlayerCard";
import PlayerCard from "@/app/players/component/playerCard";
import { useState } from "react";

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
  const [openNewPlayerForm, setOpenNewPlayerForm] = useState<boolean>(false);

  const closeForm = () => {
    // Handle the player data (e.g., send it to an API)
    // After successful submission, close the form
    setOpenNewPlayerForm(false);
  };
  const handleFormSubmit = (player: Player) => {
    // Effectuez ici le traitement souhaité avec les données du formulaire
    console.log("Données soumises :", player);
    setOpenNewPlayerForm(false);
    player.id = Math.floor(Math.random() * 1000);
    setPlayerList([...playerList, player]);
    console.log(playerList);
  };

  return (
    <>
      <h1> Joueurs</h1>
      {!openNewPlayerForm && (
        <button onClick={setOpenNewPlayerForm}>Ajouter un joueur</button>
      )}

      {openNewPlayerForm && (
        <NewPlayerCard onSubmit={handleFormSubmit} onClose={closeForm} />
      )}
      <div className="user-list">
        {playerList.map((p: Player) => {
          return (
            <div key={p.id}>
              <PlayerCard player={p} />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Players;
