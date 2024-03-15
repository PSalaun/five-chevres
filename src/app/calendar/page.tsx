'use client';

import NewMatch from '@/app/calendar/components/NewMatch';
import StyCard from '@/app/components/StyCard';
import MainTitle from '@/app/components/ui/MainTitle';
import StyPageContainer from '@/app/components/ui/StyPageContainer';
import Subtitle from '@/app/components/ui/Subtitle';
import { fetchMatches } from '@/app/lib/data';
import {
  deleteMatch,
  editMatch,
  getAllMatches,
  getTeamNamesFromMatch,
} from '@/app/lib/data/data';
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
  const [teamNames, setTeamNames] = useState<[string, string]>(['', '']);
  const [nextMatches, setNextMatches] = useState<Match[]>([]);
  useEffect(() => {
    const getMatches = async () => {
      const matchData = await getAllMatches();
      setMatches(matchData);
    };
    // const getTeamName = async () => {

    //   const teamsNameData = await getTeamNamesFromMatch([
    //     matches[0].left_team_id,
    //     matches[0].right_team_id,
    //   ]);
    //   setTeamNames(teamsNameData);
    // };

    getMatches();
    //getTeamName();
    console.log(nextMatches);
  }, []);
  useEffect(() => {
    if (matches.length > 0) {
      const getNextMatches = async () => {
        console.log(matches);
        console.log(new Date());
        setNextMatches(matches.filter((item: Match) => item.date > new Date()));
      };
      getNextMatches();
    }
  }, [matches]);
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
        {/* <NewMatch title='Ajouter un nouveau match' /> */}
      </Container>
      {nextMatches.map((item: Match) => (
        <Grid item spacing={2} key={item.id} xs={12}>
          <StyCard title={`Match no.${item.id}`}>
            <Typography variant='body1'>
              {item.date ? item.date?.toLocaleDateString() : 'no date'}
            </Typography>
            <Typography variant='body1'>
              Score final :{item.score_left_team} - {item.score_right_team}
            </Typography>
            <Typography variant='body1'>
              {teamNames[0]} VS {teamNames[1]}
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
                <TextField
                  label='score équipe gauche'
                  value={item.score_left_team}
                  onChange={(e) =>
                    (item.score_left_team = parseInt(e.target.value))
                  }></TextField>
                <TextField
                  label='score équipe droite'
                  value={item.score_right_team}
                  onChange={(e) =>
                    (item.score_right_team = parseInt(e.target.value))
                  }
                />
                <Button
                  onClick={() =>
                    editMatch(
                      item.id,
                      item.score_left_team,
                      item.score_right_team
                    )
                  }>
                  Valider
                </Button>
                <Button onClick={() => deleteMatch(item.id)}>
                  Supprimer match
                </Button>
              </>
            )}
          </StyCard>
        </Grid>
      ))}
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
                <Typography variant='body1'>
                  {teamNames[0]} VS {teamNames[1]}
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
                    <TextField
                      label='score équipe gauche'
                      value={item.score_left_team}
                      onChange={(e) =>
                        (item.score_left_team = parseInt(e.target.value))
                      }></TextField>
                    <TextField
                      label='score équipe droite'
                      value={item.score_right_team}
                      onChange={(e) =>
                        (item.score_right_team = parseInt(e.target.value))
                      }
                    />
                    <Button
                      onClick={() =>
                        editMatch(
                          item.id,
                          item.score_left_team,
                          item.score_right_team
                        )
                      }>
                      Valider
                    </Button>
                    <Button onClick={() => deleteMatch(item.id)}>
                      Supprimer match
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
