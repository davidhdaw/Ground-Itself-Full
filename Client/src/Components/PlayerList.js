import React from "react";
import './PlayerList.scss'
import CheckIcon from '@mui/icons-material/Check';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function PlayerList({ game }) {

    return (
        <div className="playerList">
        <p className='membersTitle'>GAME MEMBERS:</p>
        {game.players && game.players.map((player, i) => 
        <div className='memberContainer'>
        <div className='checkContainer'>
            {((game.phase === 0) && player.confirmLocation) && <CheckIcon fontSize="small" color="success" />}
            {((game.phase !== 0) && (i === 0)) && <ArrowRightIcon fontSize="small" sx={{ color: 'white' }} />}
        </div>
        { ((game.phase !== 0) && (i !== 0)) ?
            <div className='memberName'>{player.username}</div> : <div className='memberName firstPlayer'>{player.username}</div>
        }
        
        </div>
        )}
        </div>
    )
}

export default PlayerList