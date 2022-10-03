import './App.css';
import Nav from './Components/Nav'
import GameArea from './Components/GameArea'
import Chat from './Components/Chat'
import ChatBubble from './Components/ChatBubble';

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
