import './App.css';
import React, {useState} from 'react'
import Nav from './Components/Nav'
import GameArea from './Components/GameArea'
import Chat from './Components/Chat'

function App() {
  const initialGame = {
    location: 'Palm Springs, CA',
    playLength: 'Years',
    phase: 1,
    establishingOptions: [
      "What was this place in the past? How long ago was that?",
      "What was the greatest moment in this place's history? (An innovation? A discovery? A revolution? A new    sapling? The emergence of a cycle    of cicadas?)",
      "If there are inhabitants, what are the visions for the future that they hold?",
      "Who lives here? What is an average person like in this place? What do they look like? What do they wear? -OR- Describe the flora and fauna. What is the landscape like? What animals and plants call it home?",
      "Who or what (a person, landmark, society) has been in this place the longest? How did they come to be here?",
      "What stories are told in or about this place? Does it have legends or myths? Does it have religion?",
      "What is this placed named or called? Who named it, and for what reason?",
      "What is valued in this place? What is it known to have in excess?",
      "Who or what is in power here? (Is it a ruler? An apex predator? A series of laws that govern society? The weather?)",
      "What are the threats to this place? Are these threats to the materiality of the place, or the people that live in it?",
      "What was the greatest tragedy in this place’s past? How is it remembered?",
      "If there are multiple people who live here, what are they divided on? What are the points of contention that are fought over? -OR- If there are not multiple people, what resources do the plants, animals, or visitors to our place vie for?"
    ],
    establishingDrawn: [],
    questions: [
  
    ],
    questionsDrawn: []
  }
  const [game, setGame] = useState(initialGame)
  
  return (
    <div className="App">
      <Nav gameState={game} />
      <GameArea />
      <Chat />
    </div>
  );
}

export default App;
