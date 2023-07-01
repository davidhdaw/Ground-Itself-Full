import './Chat.css'
import React, {useState, useEffect} from 'react';
import ChatBubble from './ChatBubble'

function Chat({socket, game}) {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  
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


useEffect(() => {
  socket.on('recieve_message', (data) => {
  })
}, [socket])

return (
      <div className={chatOpen ? 'openChat' : 'Chat'}>
        <button onClick={toggleChat}>{chatOpen ? '-' : '+'}</button>
        <div className="chatLog">
            { game.chat && game.chat.map(message => <ChatBubble message={message} />)}
            <hr></hr>
            <input type='text' placeholder='new message' value={message} 
            onChange={e => setMessage(e.target.value)}>
            </input>
            <br></br>
            <button onClick={sendMessage}>Send Message</button>
        </div>
      </div>
    );
}

export default Chat