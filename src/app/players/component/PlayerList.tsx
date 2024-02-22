import { Player } from "@/app/lib/types";
import NewPlayerCard from "@/app/players/component/newPlayerCard";
import PlayerCard from "@/app/players/component/playerCard";

export function Players({ playerList }: { playerList: Player[] }) {
  return (
    <div className="user-list">
      <NewPlayerCard />
      {playerList.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}
export default Players;
