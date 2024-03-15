'use client';
import StyCard from '@/app/components/StyCard';
import { Button, Grid, Typography } from '@mui/material';
import MainTitle from '@/app/components/ui/MainTitle';
import StyPageContainer from '@/app/components/ui/StyPageContainer';
import { createMatch, fetchNextMatch } from '@/app/lib/data/data';
import React, { useEffect } from 'react';
import DatePickerModal from '@/app/components/DatePickerModal';
import { Match } from '@/app/lib/types';

export default function Home() {
  const [nextMatch, setNextMatch] = React.useState<Match | null>(null);
  const getNextMatch = async () => {
    const data = await fetchNextMatch();
    setNextMatch(data);
  };
  const createMatchAndRedirect = (datetime: string) => {
    createMatch(datetime).then((matchId) => {
      window.location.href = `/composition/${matchId}`;
    });
  };
  useEffect(() => {
    getNextMatch();
  }, []);
  const [isOpen, setIsOpen] = React.useState(false);
  const openModal = () => setIsOpen(true);
  return (
    <StyPageContainer>
      <MainTitle>Five Chèvres</MainTitle>
      <Grid
        container
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '30rem',
          display: 'flex',
        }}
        spacing={4}>
        <Grid item xs={6}>
          <Grid
            container
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
            }}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', flexGrow: '1', marginBottom: '30px' }}>
              <StyCard title='Rank'>
                <Typography sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
                  Nicolhall of fame : 1 but 🎉🎉🎉🎉
                </Typography>
              </StyCard>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', flexGrow: '1' }}>
              <StyCard title='Match'>
                <Button onClick={openModal}>Créer un match</Button>
                {nextMatch && (
                  <StyCard>
                    <Typography>
                      Prochain match le {nextMatch.date.toLocaleDateString()}
                    </Typography>
                    <Typography>
                      {nextMatch?.left_team_id} VS {nextMatch?.right_team_id}{' '}
                    </Typography>
                  </StyCard>
                )}
              </StyCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', flexGrow: '1' }}>
          <StyCard title='test'>insérer les statistiques ici</StyCard>
        </Grid>
      </Grid>
      <DatePickerModal
        isOpen={isOpen}
        createMatchCallback={createMatchAndRedirect}
      />
    </StyPageContainer>
  );
}
