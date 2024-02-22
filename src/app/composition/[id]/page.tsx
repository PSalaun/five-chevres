"use client"
import { Box, Button, List, ListItem, Switch, Typography } from "@mui/material";
import { Player, Team } from "@/app/lib/types";
import { createTeams, fetchPlayers, fetchPlayersAndSetAvailability } from "@/app/lib/data/data";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Composition = () => {
    const params = useParams();
    const matchId = params.id;
    const [players, setPlayers] = useState<Player[]>([]);
    const [teams, setTeams] = useState<[Team, Team] | [null, null]>([null, null]);
    const [compositions, setCompositions] = useState<Record<string, Array<Player>>>({ teamA: [], teamB: [] });
    useEffect(() => {
        console.log({ params, matchId })
        const getPlayers = async () => {
            const players = await fetchPlayers();
            // const players = await fetchPlayersAndSetAvailability(parseInt(matchId, 10));
            setPlayers(players);
        }
        getPlayers();
        const fetchTeams = async () => {
            const teams = await createTeams();
            setTeams(teams);
        }
        fetchTeams();
    }, [])
    const createCompositions = (teams: [Team, Team] | [null, null], players: Player[]) => {
        // avoir 2 teams, de 5 joueurs chacune
        // avoir au moins 1 joueur par groupe
        if (!teams[0] || !teams[1]) return;
        const playersByTier = players.reduce<Record<number, Player[]>>((acc, player: Player) => {
            if (acc[player.tier]) {
                acc[player.tier].push(player);
            } else {
                acc[player.tier] = [player];
            }
            return acc;
        }, {});
        const leftTeamName = teams[0].name;
        const rightTeamName = teams[1].name;
        const generatedCompositions = Object.entries(playersByTier).reduce((teams: Record<string, Array<Player>>, currentTier) => {
            const randomizedPlayers = currentTier[1].sort(() => Math.random() - 0.5);
            randomizedPlayers.forEach((player: Player) => {
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
                            {/* <Switch
                                checked={player.isAvailable}
                                onChange={handleChange}
                            /> */}
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