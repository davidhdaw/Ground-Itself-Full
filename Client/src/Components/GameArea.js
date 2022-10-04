import './GameArea.css'
import CreateJoin from './CreateJoin';

function GameArea({game, setGame}) {

    return (
      <div className='GameArea'>
        {game.phase === 0 && <CreateJoin game={game} setGame={setGame} />}
      </div>
    );
  }


export default GameArea