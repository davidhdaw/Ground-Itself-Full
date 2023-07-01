function ChatBubble({message}) {
    return (
      <div className='chatBubble'>
        <h3>{message.user}</h3>
        <p>{message.message}</p>
      </div>
    );
  }
export default ChatBubble