"use client";
import StyCard from "@/app/components/StyCard";
import { Button, Grid, Typography } from "@mui/material";
import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";
import { createMatch } from "@/app/lib/data/data";
import React from "react";
import DatePickerModal from "@/app/components/DatePickerModal";


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
          <StyCard title="test">insérer les statistiques ici</StyCard>
        </Grid>
      </Grid>
      <DatePickerModal isOpen={isOpen} createMatchCallback={createMatchAndRedirect} />
    </StyPageContainer>
  );
}
