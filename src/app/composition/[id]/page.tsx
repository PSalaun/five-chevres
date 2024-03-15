'use client';
import { Box, Button, List, ListItem, Switch, Typography } from '@mui/material';
import { Match, Player, PlayerWithAvailability, Team } from '@/app/lib/types';
import {
  createTeams,
  createTeamsAndPlayers,
  deleteAllTeams,
  deleteTeam,
  fetchExistingTeams,
  fetchMatches,
  fetchPlayers,
  fetchPlayersAndSetAvailability,
  getTeamPlayersName,
  putAvailability,
} from '@/app/lib/data/data';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Composition = () => {
  const params = useParams();
  const paramMatchId = params.id as string;
  const matchId = parseInt(paramMatchId, 10);
  const [players, setPlayers] = useState<PlayerWithAvailability[]>([]);
  const [teams, setTeams] = useState<[Team, Team] | [null, null]>([null, null]);
  const [existingTeams, setExistingTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [compositions, setCompositions] = useState<
    Record<string, Array<PlayerWithAvailability>>
  >({ teamA: [], teamB: [] });
  useEffect(() => {
    //console.log({ params, matchId });
    const getPlayers = async () => {
      const players = await fetchPlayersAndSetAvailability(matchId);
      // const players = await fetchPlayersAndSetAvailability(parseInt(matchId, 10));
      setPlayers(players);
    };
    getPlayers();
    // const fetchTeams = async () => {
    //   const teams = await createTeams();
    //   setTeams(teams);
    // };
    // fetchTeams();
    const getTeams = async () => {
      const allTeams = await fetchExistingTeams();
      //console.log(allTeams);
      setTeams([allTeams[allTeams.length - 1], allTeams[allTeams.length - 2]]);
      setExistingTeams(allTeams);
    };
    getTeams();
    const getMatches = async () => {
      const allMatches = await fetchMatches();
      setMatches(allMatches);
    };
    getMatches();
  }, []);
  useEffect(() => {
    if (!existingTeams) return;
    let players: Record<number, Player[]> = [];

    existingTeams.forEach((team: Team) => {
      const player = getTeamPlayersName(team.id);
      players.push(player);
    });
  }, [existingTeams]);

  const createCompositions = (
    teams: [Team, Team] | [null, null],
    players: PlayerWithAvailability[]
  ) => {
    // avoir 2 teams, de 5 joueurs chacune
    // avoir au moins 1 joueur par groupe
    if (!teams[0] || !teams[1]) return;
    const playersByTier = players.reduce<
      Record<number, PlayerWithAvailability[]>
    >((acc, player: PlayerWithAvailability) => {
      if (acc[player.tier]) {
        acc[player.tier].push(player);
      } else {
        acc[player.tier] = [player];
      }
      return acc;
    }, {});
    const leftTeamName = teams[0].name;
    const rightTeamName = teams[1].name;
    const generatedCompositions = Object.entries(playersByTier).reduce(
      (teams: Record<string, Array<PlayerWithAvailability>>, currentTier) => {
        const randomizedPlayers = currentTier[1].sort(
          () => Math.random() - 0.5
        );
        randomizedPlayers.forEach((player: PlayerWithAvailability) => {
          const teamName =
            teams[leftTeamName].length > teams[rightTeamName].length
              ? rightTeamName
              : leftTeamName;
          teams[teamName].push(player);
        });
        return teams;
      },
      { [leftTeamName]: [], [rightTeamName]: [] }
    );
    setCompositions(generatedCompositions);
    console.log(generatedCompositions);
  };
  const generateTeams = async () => {
    const teams = await createTeams();
    setTeams(teams);
    createTeamsAndPlayers(matchId, teams, compositions);
  };
  const updateAvailability = (isAvailable: boolean, playerId: number) => {
    putAvailability(playerId, matchId, isAvailable);
    const updatedPlayers = players.map((player) =>
      player.id === playerId ? { ...player, isAvailable } : player
    );
    setPlayers(updatedPlayers);
  };

  const leftTeamName = teams[0]?.name;
  const rightTeamName = teams[1]?.name;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 24,
          minHeight: '100vh',
          width: '100%',
        }}>
        <aside>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <p>Match :</p>
            {matches.map((match) => (
              <p key={match.id}>{match.id} </p>
            ))}
          </Box>
          <Typography variant='h3' sx={{ mb: 2 }}>
            Joueurs
          </Typography>
          <List
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
            {[...players]
              .sort((a, b) => a.tier - b.tier)
              .map((player) => {
                return (
                  <li key={player.id}>
                    <Box sx={{ display: 'flex' }}>
                      {player.name} - Chapeau {player.tier}
                      <Switch
                        checked={player.isAvailable}
                        onChange={(e) =>
                          updateAvailability(e.target.checked, player.id)
                        }
                      />
                    </Box>
                  </li>
                );
              })}
          </List>
        </aside>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <div>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {leftTeamName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: '300px',
                  height: '220px',
                  backgroundColor: 'green',
                  padding: '2rem 1.5rem',
                }}>
                {leftTeamName && (
                  <List
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around',
                    }}>
                    {compositions[leftTeamName]?.map((player: Player) => (
                      <ListItem
                        sx={{
                          listStyle: 'none',
                          textAlign: 'center',
                          fontWeight: 700,
                          width: 'fit-content',
                          mb: 2,
                        }}
                        key={player.id}>
                        {player.name}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </div>
            <div>
              <Typography variant='h4' sx={{ mb: 2 }}>
                {rightTeamName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: '300px',
                  height: '220px',
                  backgroundColor: 'green',
                  padding: '2rem 1.5rem',
                }}>
                {rightTeamName && (
                  <List
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around',
                    }}>
                    {compositions[rightTeamName]?.map((player: Player) => (
                      <ListItem
                        sx={{
                          listStyle: 'none',
                          textAlign: 'center',
                          fontWeight: 700,
                          width: 'fit-content',
                          mb: 2,
                        }}
                        key={player.id}>
                        {player.name}
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </div>
          </Box>
          <Button
            variant='contained'
            onClick={() => createCompositions(teams, players)}>
            Génère moi les équipes
          </Button>
          <Button variant='contained' onClick={() => generateTeams()}>
            Valider et créer le match
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          maxHeight: '80%',
          overflowY: 'scroll',
        }}>
        <h1>Composition passées</h1>
        <Button
          onClick={() => {
            deleteAllTeams();
          }}>
          Tout effacer
        </Button>
        {existingTeams.map((team) => (
          <Box
            key={team.id}
            sx={{ display: 'flex', gap: 2, flexDirection: 'row' }}>
            <p>
              {team.name} id :{team.id}
            </p>
            <Button onClick={() => deleteTeam(team.id)}>Supprimer</Button>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Composition;
