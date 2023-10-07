import React, {useState, useEffect} from 'react'
import { Routes, Route, useNavigate, useParams } from "react-router-dom"
import Nav from './Components/Nav'
import CreateJoin from './Components/CreateJoin'
import GameArea from './Components/GameArea'
import Chat from './Components/Chat'
import io from 'socket.io-client'
import Login from './Components/login'
import './App.css'
import BaseLayout from './Components/layout/BaseLayout'


const socket = io.connect('http://localhost:3001', {autoConnect: false})
// const socket = io.connect('ground-itself-full-production.up.railway.app', {autoConnect: false})



const sessionID = localStorage.getItem("sessionID");
const gameID = localStorage.getItem('gameID');

function App() {
  const [game, setGame] = useState({phase: 0})
  const [games, setGames] = useState([])
  const [usernameSelected, setUsernameSelected] = useState(false)
  const navigate = useNavigate()

  socket.on('games_list', (data) => {
    setGames(data)
  })

  socket.on('reset', () => {
    setGame({phase: 0})
    navigate("/")
  })

  socket.on("session", ({ sessionID, userID, username }) => {
    socket.auth = { sessionID };
    localStorage.setItem("sessionID", sessionID);
    localStorage.setItem('userID', userID)
    socket.userID = userID;
    socket.username = username;
  });


  useEffect(() => {
    if (sessionID) {
      console.log('firing')
      setUsernameSelected(true);
      socket.auth = { sessionID };
      socket.connect();
    }

  }, [])





  socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
      setUsernameSelected(false)
    }
  });

  if (!usernameSelected) {
    return (
    <div className="App">
      <Login setUsernameSelected={setUsernameSelected} socket={socket} />
    </div>
    )
  } else {

  return (
    <div className="App">
      <BaseLayout>
      <Nav game={game} socket={socket} setGame={setGame} setUsernameSelected={setUsernameSelected} />
      <Routes>
        <Route
          exact path="/"
          element={
            <CreateJoin setGame={setGame} socket={socket} games={games} />
          }
        />
        <Route
          path="/:id"
          element={
            <div className='gamePage'>
                <GameArea game={game} setGame={setGame} socket={socket} games={games} />
                <Chat socket={socket} game={game} />
            </div>
          }
        />
      
      </Routes>
      </BaseLayout>

    </div>
  );
  }
}
export default App