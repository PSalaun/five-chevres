import { fetchPlayers } from "@/app/lib/data/data";
import { Player } from "@/app/lib/types";
import NewPlayerCard from "@/app/players/component/newPlayerCard";
import PlayerCard from "@/app/players/component/playerCard";

async function Players() {
  const playersList = await fetchPlayers();
  console.log(playersList);
  console.log(playersList.rows);
  // const [playerList, setPlayerList] = useState<Player[]>([
  //   {
  //     id: 0,
  //     name: "Jane",
  //     hat: 1,
  //     photo: "1",
  //   },
  //   {
  //     id: 1,
  //     name: "John",
  //     hat: 1,
  //     photo: "2",
  //   },
  //   {
  //     id: 2,
  //     name: "Janne",
  //     hat: 3,
  //     photo: "2",
  //   },
  // ]);

  // const handleFormSubmit = (player: Player) => {
  //   // Effectuez ici le traitement souhaité avec les données du formulaire
  //   console.log("Données soumises :", player);
  //   player.id = Math.floor(Math.random() * 1000);
  //   setPlayerList([...playerList, player]);
  //   console.log(playerList);
  // };

  return (
    <div className="page-container">
      <h1 className="page-title"> Joueurs</h1>
    </div>
  );
}
export default Players;
