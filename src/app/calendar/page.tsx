'use client';

import NewMatch from '@/app/calendar/components/NewMatch';
import StyCard from '@/app/components/StyCard';
import MainTitle from '@/app/components/ui/MainTitle';
import StyPageContainer from '@/app/components/ui/StyPageContainer';
import Subtitle from '@/app/components/ui/Subtitle';
import { fetchMatches } from '@/app/lib/data';
import { editMatch, getAllMatches } from '@/app/lib/data/data';
import { Match } from '@/app/lib/types';
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const Calendar = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [openDetails, setopenDetails] = useState<Boolean>(false);
  useEffect(() => {
    const getMatches = async () => {
      const matchData = await getAllMatches();
      setMatches(matchData);
    };
    getMatches();
  }, []);
  return (
    <StyPageContainer>
      <MainTitle>Matchs</MainTitle>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'rows',
          padding: '0 !important',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}>
        <Subtitle>A venir</Subtitle>
        <NewMatch title='Ajouter un nouveau match' />
      </Container>
      <StyCard>A venir</StyCard>
      <Container sx={{ padding: '0 !important', marginTop: '1rem' }}>
        <Subtitle>Historique</Subtitle>
        <Grid container spacing={2}>
          {matches.map((item: Match) => (
            <Grid item spacing={2} key={item.id} xs={12}>
              <StyCard title={`Match no.${item.id}`}>
                <Typography variant='body1'>
                  {item.date ? item.date?.toLocaleDateString() : 'no date'}
                </Typography>
                <Typography variant='body1'>
                  Score final :{item.score_left_team} - {item.score_right_team}
                </Typography>
                <Button
                  onClick={() => {
                    setopenDetails(true);
                  }}>
                  Editer le match
                </Button>
                {openDetails && (
                  <>
                    <input type='date' label='date du match'></input>
                    <TextField label='score équipe gauche'></TextField>
                    <TextField label='score équipe droite'></TextField>
                    <Button
                      onClick={() =>
                        //editMatch(item.id, leftScore, rightScore, date)
                      }>
                      Valider
                    </Button>
                  </>
                )}
              </StyCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyPageContainer>
  );
};

export default Calendar;
