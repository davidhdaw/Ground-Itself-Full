import './Nav.css'

function Nav({gameState}) {
    return (
      <header className="Nav">
        <div className="gameInfo">
            <p>Game Location: {gameState.location}</p>
            <p>Cycle Length: {gameState.playLength}</p>
            <p>Game Phase: {gameState.phase}</p>
        </div>
        <div className='userInfo'>
            <p>How to Play</p>
            <p>User Info</p>
        </div>    
      </header>
    );
  }


export default Nav