import { useEffect, useState } from "react";
import './login.scss'

function Login({socket, setUsernameSelected}) {

    const [username, setUsername] = useState('')
    const [loginError, setLoginError] = useState(false)

    const connect = () => {
      if (username === '') {
        setLoginError(true)
      } else {
        setUsernameSelected(true)
        socket.auth = { username };
        console.log(socket)
        socket.connect()      
      }
    }
    
        return (
          <section className="login">
            <h1 className="title">The Ground Itself</h1>
            <p className='subtitle'>Based on the game by Everest Pipkin</p>
            <div className="inputFormContainer">
              <h2 className="usernameInputTitle">Username</h2>
              <div className="inputForm">
                <input
                type="text"
                className='usernameInput'
                // className="usernameInput"
                value={username}
                placeholder="Enter username..."
                onChange={(e) => setUsername(e.target.value)}
                ></input>
                <button 
                  className="connectBtn" 
                  onClick={() => connect()}
                >
                  Join
                </button>
                <div>
                  {loginError && <p className="errorMessage">Please enter a username</p>}
                </div>
              </div>
            </div>
          </section>


        );
      }
    
    export default Login