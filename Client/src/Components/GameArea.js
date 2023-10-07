import './GameArea.scss'
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TimeLength from './TimeLength';
import Establishing from './Establishing';
import DrawingCards from './DrawingCards';
import WaitingRoom from './WaitingRoom';
import TenAlert from './TenAlert';
import Focused from './Focused';
import EndGame from './EndGame';

function GameArea({game, setGame, socket}) {

  let params = useParams();

  const [gameJoinError, setGameJoinError] = useState(false)

  const joinGame = () => {
    socket.emit('join_game', params.id)
  }

  useEffect(() => {
        socket.emit('find_game', params.id)
  }, [])

  socket.on('game_update', (data) => {
      setGame(data)
    })


  if ( !game || !game.id || game.id !== params.id) {
    socket.emit('find_game', params.id)
    return (
          <h1>Game Not Found</h1>
    );
  } else if (gameJoinError) {
    return (
      <h1>Selected game cannot be joined.</h1>
    )
  } else if (game.id && game.players.findIndex(player => player.userID === socket.userID) === -1) {
    joinGame()
  } else {
    let playerIndex = game.players.findIndex(player => player.userID === socket.userID)
    if (!game.players[playerIndex].connected) {
      socket.emit('reconnect', params.id)
    }
    return (
      <div className='GameArea'>
        {game.phase === 0 && <WaitingRoom game={game} socket={socket} />}
        {game.phase === 1 && <TimeLength game={game} setGame={setGame} socket={socket} />}
        {game.phase === 2 && <Establishing game={game} socket={socket} />}
        {game.phase === 3 && !game.tenFlag && !game.focusedFlag && <DrawingCards game={game} socket={socket} />}
        {game.phase === 3 && game.tenFlag && <TenAlert game={game} socket={socket} />}
        {game.phase === 3 && game.focusedFlag && <Focused game={game} socket={socket} />}
        {game.phase === 4 && <EndGame game={game} socket={socket} />}
      </div>
    );
  }


  }


export default GameArea