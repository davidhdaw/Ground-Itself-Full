import ChatBubble from './ChatBubble'

function Chat() {
    return (
      <div className="chat">
        <div className="chatLog">
           <h1>Hi Hi</h1>
           <ChatBubble />
        </div>
        <input type='text'>
        </input>
      </div>
    );
  }

export default Chat