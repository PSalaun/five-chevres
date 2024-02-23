import { Container } from "@mui/system";
import styles from "./page.module.css";
import StyCard from "@/app/components/StyCard";
import { Box, Grid, Typography } from "@mui/material";
import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";

export default function Home() {
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
                Insérer date du prochain match ici
              </StyCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", flexGrow: "1" }}>
          <StyCard title="test">insérer les statistiques ici</StyCard>
        </Grid>
      </Grid>
    </StyPageContainer>
  );
}
