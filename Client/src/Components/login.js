import { useState } from "react";

function Login({socket, setUsernameSelected}) {

    const [username, setUsername] = useState('')

    const connect = () => {
        setUsernameSelected(true)
        socket.auth = { username };
        socket.connect()
    }
    
        return (
          <div className='Login'>
            <h2>Username:</h2>
            <input type='text' 
            className='usernameInput' 
            value={username}
            placeholder="Your username..."
            onChange={e => setUsername(e.target.value)}
            ></input>
            <button className="connectBtn" onClick={connect}>Join</button>
            </div>
    
        
        );
      }
    
    export default Login