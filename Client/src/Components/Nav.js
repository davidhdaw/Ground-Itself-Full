import './Nav.css'

function Nav() {
    return (
      <header className="Nav">
        <div className="gameInfo">
            <p>Location</p>
            <p>Length of Time</p>
            <p>Phase of Play</p>
        </div>
        <div className='userInfo'>
            <p>How to Play</p>
            <p>User Info</p>
        </div>    
      </header>
    );
  }


export default Nav