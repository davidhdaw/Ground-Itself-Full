import './Nav.css'

function Nav({game}) {
    return (
      <header className="Nav">
        <div className="gameInfo">
            {game.location && <p>Game Location: {game.location}</p>}
            {game.playLength && <p>Cycle Length: {game.playLength}</p>}
            {game.phase && <p>Game Phase: {game.phase}</p>}
        </div>
        <div className='userInfo'>
            <p>How to Play</p>
            <p>User Info</p>
        </div>    
      </header>
    );
  }


export default Nav