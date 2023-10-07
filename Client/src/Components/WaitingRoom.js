import { useState, useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import './WaitingRoom.scss'

function WaitingRoom({game, socket}) {

    const [currentLocation, setCurrentLocation] = useState(game.location)

    useEffect(() => {
        setCurrentLocation(game.location)
        console.log(game.location)
    },[game])

const PlayerIndex = game.players.findIndex(player => player.userID === socket.userID)

const changeLocation = (location) => {
    socket.emit("update_location", game.id, location);
}

const toggleConfirm = () => {
    socket.emit('confirm_location', game.id)
}

const startGame = () => {
    socket.emit('start_game', game.id)
}

const copyToClipboard = () => {
    console.log('copied!')
    navigator.clipboard.writeText(game.id)
}
    return (
        <div className="waitingRoom">
            <p>Set game location</p>
            <input type='text'className="locationInput" value={currentLocation} onChange={e => changeLocation(e.target.value)}></input>
            <br></br>
            <button className='playerConfirm' onClick={toggleConfirm}>{game.players[PlayerIndex].confirmLocation ? 'Unconfirm Location' : 'Confirm Location'}</button>
            <div className='confirmationArea'>
            <p>Current Players:</p>
            <ul>
                {game.players.map(player => 
                <div className='memberContainer'>
                <div className='checkContainer'>{player.confirmLocation && <CheckIcon fontSize="small" color="success" />}</div>
                <div className='memberName'>{player.username}</div>
                </div>
                )}
                    
            </ul>
            {
                game.players.every(player => player.confirmLocation) && (socket.username === game.roomCreator) && <button className='startConfirm' onClick={startGame}>Start Game</button>
            }
            </div>

            <div className='gameCode'>
            <span className="openingSpan"> </span>
            <span>Game Code: {game.id}  </span>
            <span className="closingSpan" onClick={copyToClipboard}><ContentCopyIcon fontSize='small' /></span>
            </div>
            
        </div>
    )
}

export default WaitingRoom