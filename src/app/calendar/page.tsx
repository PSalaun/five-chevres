import NewMatch from "@/app/calendar/components/NewMatch";
import StyCard from "@/app/components/StyCard";
import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";
import Subtitle from "@/app/components/ui/Subtitle";
import { fetchMatches } from "@/app/lib/data";
import { Match } from "@/app/lib/types";
import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const Calendar = () => {
  const matchList: Match[] = fetchMatches();
  return (
    <StyPageContainer>
      <MainTitle>Matchs</MainTitle>
      <Container
        sx={{
          display: "flex",
          flexDirection: "rows",
          padding: "0 !important",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Subtitle>A venir</Subtitle>
        <NewMatch title="Ajouter un nouveau match" />
      </Container>
      <StyCard>A venir</StyCard>
      <Container sx={{ padding: "0 !important", marginTop: "1rem" }}>
        <Subtitle>Historique</Subtitle>
        <Grid container spacing={2}>
          {matchList.map((item) => (
            <Grid item spacing={2} key={item.id} xs={12}>
              <StyCard title={`Match no.${item.id}`}>
                <Typography variant="body1">
                  Score final :{item.score_left_team} - {item.score_right_team}
                </Typography>
              </StyCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyPageContainer>
  );
};

export default Calendar;
