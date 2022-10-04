import './Chat.css'
import React, {useState} from 'react';
import ChatBubble from './ChatBubble'

function Chat() {
  const [chatOpen, setChatOpen] = useState(false);
  const toggleChat = () => {
    setChatOpen(!chatOpen)
  }

    return (
      <div className={chatOpen ? 'openChat' : 'Chat'}>
        <button classname="chatToggle" onClick={toggleChat}>{chatOpen ? '-' : '+'}</button>
        <div className="chatLog">
            <ChatBubble />
            <input type='text'>
            </input>  
        </div>
      </div>
    );
  }

export default Chat