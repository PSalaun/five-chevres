import StyCard from "@/app/components/StyCard";
import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";
import { fetchUser } from "@/app/lib/data";
import { Container, Grid, Typography } from "@mui/material";
import React from "react";

const MyProfil = () => {
  const { name, tier, victories, defeats } = fetchUser();
  return (
    <StyPageContainer>
      <MainTitle>Mon profil</MainTitle>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyCard title="Informations">
            <Container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1">{name}</Typography>
              <Typography variant="body1">{tier}</Typography>
              <Typography variant="body1">
                Victoires :{victories} Défaites : {defeats}
              </Typography>
            </Container>
          </StyCard>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyCard title="Stats">
                <Typography variant="body1">Petit dataviz ici</Typography>
              </StyCard>
            </Grid>
            <Grid item xs={12}>
              <StyCard title="Historique des matchs">
                <Typography variant="body1">Petit dataviz ici</Typography>
              </StyCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyPageContainer>
  );
};

export default MyProfil;
