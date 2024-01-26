"use client";

import { useState } from "react";

const GROUPS = ['A', 'B', 'C', 'D'];

const PLAYERS = ['Briac', 'Vincent', 'Pierre S', 'Augustin', 'Océane', 'Sara', 'Dramane', 'Nicolas', 'Pierre W', 'Thomas'] 

const PLAYERS_BY_GROUPS = {
  A: ['Briac', 'Nicolas'],
  B: ['Augustin', 'Dramane'],
  C: ['Vincent', 'Pierre W'],
  D: ['Pierre S', 'Océane', 'Sara', 'Thomas']
}

const Composition = () => {
    const [teams, setTeams] = useState<Record<string, Array<string>>>({ teamA: [], teamB: []})
    const createTeams = () => {
        // avoir 2 teams, de 5 joueurs chacune
        // avoir au moins 1 joueur par groupe
        const teams = Object.entries(PLAYERS_BY_GROUPS).reduce((teams : Record<string, Array<string>>, currentGroup) => {       
            const randomizedPlayers = currentGroup[1].sort(() => Math.random() - 0.5);
            randomizedPlayers.forEach((player : string) => {
                const team = teams.teamA.length > teams.teamB.length ? 'teamB' : 'teamA';
                teams[team].push(player)
            })
            return teams;
        }, { teamA: [], teamB: []})
        setTeams(teams)
        console.log(teams)
    }

    return (
        <>
        <h1>Composition</h1>
        <div>
            {PLAYERS.map((player) => <p key={player}>{player}</p>)}
        </div>
        <button onClick={() => createTeams()}>Créer une compo</button>
        <div>
             {Object.entries(teams).map((teamNameAndPlayers) => {

                return(
                <>
                <p>{teamNameAndPlayers[0]}</p>
                <br/>
                {teamNameAndPlayers[1].map((player) => <><p key={player}>{player}</p></>)}</>)
                })}
        </div>
        </>
    )
}

export default Composition;