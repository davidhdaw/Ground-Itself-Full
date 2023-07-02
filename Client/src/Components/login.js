import { useState } from "react";
import './login.scss'

function Login({socket, setUsernameSelected}) {

    const [username, setUsername] = useState('')

    const connect = () => {
        setUsernameSelected(true)
        socket.auth = { username };
        socket.connect()
    }
    
        return (
          <section className="login">
            <h1 className="title">The Ground Itself</h1>
            <div className="inputFormContainer">
              <h2 className="usernameInputTitle">Username:</h2>
              <div className="inputForm">
                <input
                type="text"
                className="usernameInput"
                value={username}
                placeholder="Enter username..."
                onChange={(e) => setUsername(e.target.value)}
                ></input>
                <button className="connectBtn" onClick={connect}>
                Join
                </button>
              </div>
            </div>
          </section>


        );
      }
    
    export default Login