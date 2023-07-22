import { useEffect, useState } from "react";
import './login.scss'

function Login({socket, setUsernameSelected}) {

    const [username, setUsername] = useState('')
    const [inputClass, setInputClass] = useState("usernameInput")

  useEffect(() => {

  },[])

    const validateForm = () => {
      if (!username) {
        console.log("error");
        setInputClass("usernameInput error")
      } else {
        setInputClass("usernameInput")
        connect()
      }
    }

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
                className={inputClass}
                // className="usernameInput"
                value={username}
                placeholder="Enter username..."
                onChange={(e) => setUsername(e.target.value)}
                ></input>
                <div style={{ height: "20px", width: "350px", margin: "1% 0px" }}>
                  {inputClass == "usernameInput error" && "* Please enter a username"}
                </div>
                <button 
                  className="connectBtn" 
                  onClick={() => validateForm()}
                >
                  Join
                </button>
              </div>
            </div>
          </section>


        );
      }
    
    export default Login