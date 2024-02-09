import { Player } from "@/app/lib/types";
import NewPlayerCard from "@/app/players/component/newPlayerCard";
import PlayerCard from "@/app/players/component/playerCard";

export function Players({ playerList }: { playerList: Player[] }) {
  console.log(playerList);

  // const handleFormSubmit = (player: Player) => {
  //   // Effectuez ici le traitement souhaité avec les données du formulaire
  //   console.log("Données soumises :", player);
  //   player.id = Math.floor(Math.random() * 1000);
  //   setPlayerList([...playerList, player]);
  //   console.log(playerList);
  // };

  return (
    <div>
      <NewPlayerCard />
      {playerList.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}
export default Players;
