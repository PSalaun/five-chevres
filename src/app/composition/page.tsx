"use client"
import Link from "next/link";
import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Player } from "@/app/lib/types";
import { createCompositions, createTeams, fetchPlayers } from "@/app/lib/data/data";

const GROUPS = ['A', 'B', 'C', 'D'];

const PLAYERS = ['Briac', 'Vincent', 'Pierre S', 'Augustin', 'Océane', 'Sara', 'Dramane', 'Nicolas', 'Pierre W', 'Thomas']

const PLAYERS_BY_GROUPS = {
    A: ['Briac', 'Nicolas'],
    B: ['Augustin', 'Dramane'],
    C: ['Vincent', 'Pierre W'],
    D: ['Pierre S', 'Océane', 'Sara', 'Thomas']
}

const Composition = () => {
    const players = await fetchPlayers()
    const teams = await createTeams();
    const compositions = await createCompositions(teams);
    console.log(compositions);
    const leftTeam = teams[0];
    const rightTeam = teams[1];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", padding: 24, minHeight: '100vh', width: '100%' }}>
            <aside>
                <Typography variant="h3" sx={{ mb: 2 }}>Joueurs</Typography>
                <List sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {players.map((player) => <li key={player.id}>{player.name}</li>)}
                </List>
            </aside>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                    <div>
                        <Typography variant='h4' sx={{ mb: 2 }}>{leftTeam.name}</Typography>
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', height: '220px', backgroundColor: 'green', padding: '2rem 1.5rem' }}>
                            <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                {leftTeam.map((player) => <ListItem sx={{ listStyle: 'none', textAlign: 'center', fontWeight: 700, width: 'fit-content', mb: 2 }} key={player}>{player}</ListItem>)}
                            </List>
                        </Box> */}
                    </div>
                    <div>
                        <Typography variant='h4' sx={{ mb: 2 }}>{rightTeam.name}</Typography>
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', height: '220px', backgroundColor: 'green', padding: '2rem 1.5rem' }}>
                            <List sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                                {rightTeam.map((player) => <ListItem sx={{ listStyle: 'none', textAlign: 'center', fontWeight: 700, width: 'fit-content', mb: 2 }} key={player}>{player}</ListItem>)}
                            </List>
                        </Box> */}
                    </div>
                </Box>
                <Button variant="contained" onClick={() => createCompositions()}>Génère moi les équipes</Button>
            </Box>
        </Box>
    )
}

export default Composition;