import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";
import { fetchPlayers } from "@/app/lib/data";
import PlayerList from "@/app/players/component/PlayerList";
async function Players() {
  const playerList = await fetchPlayers();
  return (
    <StyPageContainer>
      <MainTitle>Joueurs</MainTitle>
      <PlayerList playerList={playerList.rows} />
    </StyPageContainer>
  );
}
export default Players;
