"use client";

import { useState } from "react";
import Link from "next/link";
import { Box, Button, List, ListItem, Typography } from "@mui/material";

const GROUPS = ['A', 'B', 'C', 'D'];

const PLAYERS = ['Briac', 'Vincent', 'Pierre S', 'Augustin', 'Océane', 'Sara', 'Dramane', 'Nicolas', 'Pierre W', 'Thomas']

const PLAYERS_BY_GROUPS = {
    A: ['Briac', 'Nicolas'],
    B: ['Augustin', 'Dramane'],
    C: ['Vincent', 'Pierre W'],
    D: ['Pierre S', 'Océane', 'Sara', 'Thomas']
}

const Composition = () => {
    const [teams, setTeams] = useState<Record<string, Array<string>>>({ teamA: [], teamB: [] })
    const createTeams = () => {
        // avoir 2 teams, de 5 joueurs chacune
        // avoir au moins 1 joueur par groupe
        const teams = Object.entries(PLAYERS_BY_GROUPS).reduce((teams: Record<string, Array<string>>, currentGroup) => {
            const randomizedPlayers = currentGroup[1].sort(() => Math.random() - 0.5);
            randomizedPlayers.forEach((player: string) => {
                const team = teams.teamA.length > teams.teamB.length ? 'teamB' : 'teamA';
                teams[team].push(player)
            })
            return teams;
        }, { teamA: [], teamB: [] })
        setTeams(teams)
    }

    const teamA = teams.teamA;
    const teamB = teams.teamB;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: "center", padding: 24, minHeight: '100vh' }}>
            <Box sx={{
                display: "inherit",
                justifyContent: "space-between",
                alignItems: "inherit",
                fontSize: "0.85rem",
                maxWidth: "var(--max-width)",
                width: "100%",
                zIndex: 2,
                fontFamily: "var(--font-mono)",
                marginBottom: "5rem"
            }}>
                <Typography variant="h1">Five chèvres</Typography>
                <Link href="/composition">Créer une composition</Link>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1.5, width: '100%', maxWidth: '1100px' }}>
                <aside>
                    <Typography variant="h3" sx={{ mb: 2 }}>Joueurs</Typography>
                    <List sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {PLAYERS.map((player) => <li key={player}>{player}</li>)}
                    </List>
                </aside>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                        <div>
                            <Typography variant='h4' sx={{ mb: 2 }}>Team A</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', height: '220px', backgroundColor: 'green', padding: '2rem 1.5rem' }}>
                                <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                    {teamA.map((player) => <ListItem sx={{ listStyle: 'none', textAlign: 'center', fontWeight: 700, width: 'fit-content', mb: 2 }} key={player}>{player}</ListItem>)}
                                </List>
                            </Box>
                        </div>
                        <div>
                            <Typography variant='h4' sx={{ mb: 2 }}>Team B</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', height: '220px', backgroundColor: 'green', padding: '2rem 1.5rem' }}>
                                <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                    {teamB.map((player) => <ListItem sx={{ listStyle: 'none', textAlign: 'center', fontWeight: 700, width: 'fit-content', mb: 2 }} key={player}>{player}</ListItem>)}
                                </List>
                            </Box>
                        </div>
                    </Box>
                    <Button variant="contained" onClick={() => createTeams()}>Génère moi les équipes</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Composition;