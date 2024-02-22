import StyCard from "@/app/components/StyCard";
import MainTitle from "@/app/components/ui/MainTitle";
import StyPageContainer from "@/app/components/ui/StyPageContainer";
import { fetchRanking } from "@/app/lib/data";
import { Grid, Typography } from "@mui/material";

const Ranking = () => {
  const ranks = fetchRanking();
  return (
    <StyPageContainer>
      <MainTitle>Classement</MainTitle>
      <Grid container spacing={2}>
        {ranks.map((item) => {
          return (
            <Grid item xs={12} key={item.player_id}>
              <StyCard title={`Joueur ${item.player_id}`}>
                <Typography variant="body1">
                  Victoires : {item.victories} Défaites : {item.defeats}
                  WR :
                  {Math.round(
                    (item.victories * 100) / (item.victories + item.defeats)
                  )}
                  %
                </Typography>
              </StyCard>
            </Grid>
          );
        })}
      </Grid>
    </StyPageContainer>
  );
};
export default Ranking;
