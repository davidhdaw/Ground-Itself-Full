import './GameArea.css'
import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TimeLength from './TimeLength';
import Establishing from './Establishing';
import DrawingCards from './DrawingCards';
import TenAlert from './TenAlert';
import Focused from './Focused';
import EndGame from './EndGame';

function GameArea({game, setGame, socket}) {

  let params = useParams();

  const [password, setPassword] = useState('')
  const [thisGame, setThisGame] = useState({})

  const joinGame = () => {
    const joinForm = {
      id: params.id,
      username: socket.username,
      password: password
    } 
    socket.emit('join_game', joinForm)
  }

  // socket.on('identified_game', (data) => {
  //   console.log(data)
  //   setThisGame(data)
  // })

  socket.on('game_update', (data) => {
      setGame(data)
      console.log(data)
    })


  if ( !game || !game.id || game.id !== params.id) {
    return (
          <div className='JoinForm'>
            <p>Game Password (Can Be Left Blank):</p>
            <input type='text' 
            className='passwordInput' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            ></input>
            <hr></hr>
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
  } else {
    return (
      <div className='GameArea'>
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