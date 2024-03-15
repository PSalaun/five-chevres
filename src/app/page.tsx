"use client";
import StyCard from "@/app/components/StyCard";
import { Button, Grid, Typography } from "@mui/material";
import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";
import { createMatch, getPlayersRanking } from "@/app/lib/data/data";
import React, { useEffect } from "react";
import DatePickerModal from "@/app/components/DatePickerModal";

const Ranking = () => {
  const [statisticsByPlayer, setStatisticsByPlayer] = React.useState<{
    id: number;
    name: string;
    matchCount: number;
    victoryPercentage: number;
  }[]>([])
  useEffect(() => {
    getPlayersRanking().then((stats) => setStatisticsByPlayer(stats))
  },[])
  const comp = statisticsByPlayer.map(playerStats => 
    <Typography key={playerStats.name}>{playerStats.name} : {playerStats.victoryPercentage}% de victoires sur {playerStats.matchCount} matchs</Typography>
  )
  return <StyCard title="test">{comp}</StyCard>;
}

export default function Home() {
  const createMatchAndRedirect = (datetime: string) => {
    createMatch(datetime).then((matchId) => {
      window.location.href = `/composition/${matchId}`;
    });
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  return (
    <StyPageContainer>
      <MainTitle>Five Chèvres</MainTitle>
      <Grid
        container
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "30rem",
          display: "flex",
        }}
        spacing={4}
      >
        <Grid item xs={6}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: "flex", flexGrow: "1", marginBottom: "30px" }}
            >
              <StyCard title="Rank">
                <Typography sx={{ fontWeight: 700, fontSize: '1.5rem'}}>Nicolhall of fame : 1 but 🎉🎉🎉🎉</Typography>
              </StyCard>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", flexGrow: "1" }}>
              <StyCard title="Match">
                <Button onClick={openModal}>Créer un match</Button>
                Insérer date du prochain match ici
              </StyCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexGrow: "1" }}>
          <Ranking />
        </Grid>
      </Grid>
      <DatePickerModal isOpen={isOpen} createMatchCallback={createMatchAndRedirect} />
    </StyPageContainer>
  );
}
