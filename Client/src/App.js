import './App.css';
import React, {useState} from 'react'
import Nav from './Components/Nav'
import GameArea from './Components/GameArea'
import Chat from './Components/Chat'

function App() {
  return (
    <div className="App">
      <Nav />
      <GameArea />
      <Chat />
    </div>
  );
}

export default App;
