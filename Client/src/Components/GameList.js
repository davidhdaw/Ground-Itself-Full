import React from 'react';
import { Link } from 'react-router-dom';

function GameList({games, setForm}) {

    return (
        Object.keys(games).map((key, i) => (
            <div>
                <Link  to={'/' + key} key={i}>{games[key].location}</Link>
            </div>

        ))
    )
}

export default GameList