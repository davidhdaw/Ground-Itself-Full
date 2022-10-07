import './App.css';
import React, {useState} from 'react'
import Nav from './Components/Nav'
import GameArea from './Components/GameArea'
import Chat from './Components/Chat'


function App() {
  const [game, setGame] = useState({phase: 0})

  return (
    <div className="App">
      <Nav game={game} />
      <GameArea game={game} setGame={setGame} />
      <Chat />
    </div>
  );
}

export default App;
