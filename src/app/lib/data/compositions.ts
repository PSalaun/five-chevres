"use server"

import { fetchPlayers } from "@/app/lib/data/data";
import { Player, Team } from "@/app/lib/types";

export const createCompositions = async (teams: [Team, Team]) => {
    // avoir 2 teams, de 5 joueurs chacune
    // avoir au moins 1 joueur par groupe
    const players = await fetchPlayers();
    const playersByTier = players.reduce<Record<number, Player[]>>((acc, player: Player) => {
        if (acc[player.tier]) {
            acc[player.tier].push(player);
        } else {
            acc[player.tier] = [player];
        }
        return acc;
    }, {});
    const compositions = Object.entries(playersByTier).reduce((teams: Record<string, Array<Player>>, currentTier) => {
        const randomizedPlayers = currentTier[1].sort(() => Math.random() - 0.5);
        randomizedPlayers.forEach((player: Player) => {
            const team = teams.teamA.length > teams.teamB.length ? 'teamB' : 'teamA';
            teams[team].push(player)
        })
        return teams;
    }, { teamA: [], teamB: [] })
    return compositions;
}