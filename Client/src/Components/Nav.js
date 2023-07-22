import './Nav.css'
import { useNavigate } from 'react-router-dom'
import CustomButton from './buttons/CustomButton'
import { useEffect } from 'react'

function Nav({game, setGame, socket, setUsernameSelected}) {

  useEffect(() => {
    console.log(game.phase);
  },[game])


  const navigate = useNavigate()

  const disconnectGame = () => {
    //send signal 
    //remove from room
    //Set player to disconnected
    socket.emit('leave_game', game.id)
    //erase local storage gameID
    localStorage.removeItem('gameID')
    localStorage.removeItem('password')
    setGame({phase: 0})
    navigate("/")
  }

  const disconnectUser = () => {
    game.id && socket.emit('leave_game', game.id)
    socket.disconnect()
    localStorage.removeItem('gameID')
    localStorage.removeItem('userID')
    localStorage.removeItem('password')
    localStorage.removeItem('sessionID')
    setUsernameSelected(false)
    setGame({phase: 0})
    navigate("/")
  }

    return (
      <section className="Nav">
        <section className="gameInfo">
            {game.location && <p>Game Location: {game.location}</p>}
            {game.playLength && <p>Cycle Length: {game.playLength}</p>}
            {game.phase != 0 && <p>Game Phase: {game.phase}</p>}
            {game.phase === 3 && <p>Current Turn: {game.players[0].username}</p>}
            {game.id && <button className='disconnectGame' onClick={disconnectGame}>Exit Game</button>}
        </section>
        <section className='userInfo'>
            <p>How to Play</p>
            <p>User Info</p>
            <button className='disconnectUser' onClick={disconnectUser}>Log Out</button>
        </section>    
      </section>
    );
  }


export default Nav