"use client"
import { Box, Button, List, ListItem, Switch, Typography } from "@mui/material";
import { Player, PlayerWithAvailability, Team } from "@/app/lib/types";
import { createTeams, fetchPlayersAndSetAvailability, putAvailability } from "@/app/lib/data/data";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Composition = () => {
    const params = useParams();
    const paramMatchId = params.id as string;
    const matchId = parseInt(paramMatchId, 10);
    const [players, setPlayers] = useState<PlayerWithAvailability[]>([]);
    const [teams, setTeams] = useState<[Team, Team] | [null, null]>([null, null]);
    const [compositions, setCompositions] = useState<Record<string, Array<PlayerWithAvailability>>>({ teamA: [], teamB: [] });
    useEffect(() => {
        const getPlayers = async () => {
            const players = await fetchPlayersAndSetAvailability(matchId);
            setPlayers(players);
        }
        getPlayers();
        const fetchTeams = async () => {
            const teams = await createTeams();
            setTeams(teams);
        }
        fetchTeams();
    }, [])

    const updateAvailability = (isAvailable: boolean, playerId: number) => {
        putAvailability(playerId, matchId, isAvailable);
        const updatedPlayers = players.map(player => player.id === playerId ? { ...player, isAvailable } : player);
        setPlayers(updatedPlayers);
    }

    const createCompositions = (teams: [Team, Team] | [null, null], players: PlayerWithAvailability[]) => {
        // avoir 2 teams, de 5 joueurs chacune
        // avoir au moins 1 joueur par groupe
        if (!teams[0] || !teams[1]) return;
        const playersByTier = players.reduce<Record<number, PlayerWithAvailability[]>>((acc, player: PlayerWithAvailability) => {
            if (acc[player.tier]) {
                acc[player.tier].push(player);
            } else {
                acc[player.tier] = [player];
            }
            return acc;
        }, {});
        const leftTeamName = teams[0].name;
        const rightTeamName = teams[1].name;
        const generatedCompositions = Object.entries(playersByTier).reduce((teams: Record<string, Array<PlayerWithAvailability>>, currentTier) => {
            const randomizedPlayers = currentTier[1].filter(player => player.isAvailable).sort(() => Math.random() - 0.5);
            randomizedPlayers.forEach((player: PlayerWithAvailability) => {
                const teamName = teams[leftTeamName].length > teams[rightTeamName].length ? rightTeamName : leftTeamName;
                teams[teamName].push(player)
            })
            return teams;
        }, { [leftTeamName]: [], [rightTeamName]: [] })
        setCompositions(generatedCompositions)
    }

    const leftTeamName = teams[0]?.name;
    const rightTeamName = teams[1]?.name;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", padding: 24, minHeight: '100vh', width: '100%' }}>
            <aside>
                <Typography variant="h3" sx={{ mb: 2 }}>Joueurs</Typography>
                <List sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[...players].sort((a, b) => a.tier - b.tier).map((player) => {
                        return <li key={player.id}><Box sx={{ display: 'flex' }}>
                            {player.name} - Chapeau {player.tier}
                            <Switch
                                checked={player.isAvailable}
                                onChange={(e) => updateAvailability(e.target.checked, player.id)}
                            />
                        </Box></li>
                    }
                    )}
                </List>
            </aside>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                    <div>
                        <Typography variant='h4' sx={{ mb: 2 }}>{leftTeamName}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', height: '220px', backgroundColor: 'green', padding: '2rem 1.5rem' }}>
                            {leftTeamName && <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                {compositions[leftTeamName]?.map((player: Player) => <ListItem sx={{ listStyle: 'none', textAlign: 'center', fontWeight: 700, width: 'fit-content', mb: 2 }} key={player.id}>{player.name}</ListItem>)}
                            </List>}
                        </Box>
                    </div>
                    <div>
                        <Typography variant='h4' sx={{ mb: 2 }}>{rightTeamName}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', height: '220px', backgroundColor: 'green', padding: '2rem 1.5rem' }}>
                            {rightTeamName && <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                {compositions[rightTeamName]?.map((player: Player) => <ListItem sx={{ listStyle: 'none', textAlign: 'center', fontWeight: 700, width: 'fit-content', mb: 2 }} key={player.id}>{player.name}</ListItem>)}
                            </List>}
                        </Box>
                    </div>
                </Box>
                <Button variant="contained" onClick={() => createCompositions(teams, players)}>Génère moi les équipes</Button>
            </Box>
        </Box>
    )
}

export default Composition;