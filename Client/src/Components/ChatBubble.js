import './ChatBubble.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ChatBubble({message}) {
    return (
      <div className='chatBubble'>
        <div className='nameContainer'>
        <AccountCircleIcon color='disabled' />
        <h3 className='chatSender'>{message.user}</h3>
        </div>
        <p className='chatMessage'>{message.message}</p>
      </div>
    );
  }
export default ChatBubble