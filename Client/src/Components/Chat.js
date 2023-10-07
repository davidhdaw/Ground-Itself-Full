import './Chat.scss'
import React, {useState, useEffect} from 'react';
import ChatBubble from './ChatBubble'
import PlayerList from './PlayerList'
import SendIcon from '@mui/icons-material/Send';

function Chat({socket, game}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  const element = document.getElementById('chatEnd')
  
  const toggleChat = () => {
    setChatOpen(!chatOpen)
  }

  function sendMessage() {
    const messageObject = {
      message: message,
      id: game.id
    }
  console.log(socket.username)
  socket.emit("send_message", messageObject)
  setMessage('')
  }

  socket.on('recieve_message', () => {
    element.scrollIntoView({behavior: 'smooth'})
  })

  const enterPress = (e) => {
    if(e.keyCode === 13) {
      sendMessage()
      element.scrollIntoView({behavior: 'smooth'})
    }
  }

return (
      <div className={chatOpen ? 'openChat' : 'Chat'}>
                <button className='openBtn' onClick={toggleChat}>{chatOpen ? '-' : '+'}</button>
        <div className="chatLog">
            <PlayerList game={game} />
            <div className='chatScroll'>
            { game.chat && game.chat.map(message => <ChatBubble message={message} />)}
            <div id='chatEnd'></div>
            </div>
            <div className='messageForm'>
            <hr></hr>
            <div className='messageInputContainer'>
            <input type='text' className='messageField' placeholder='new message' value={message} onKeyDown={e => enterPress(e)}
            onChange={e => setMessage(e.target.value)}>
            </input>
            <button className='sendMessageButton' onClick={sendMessage}><SendIcon fontSize='small' /></button>
            </div>
            </div>
        </div>
      </div>
    );
}

export default Chat