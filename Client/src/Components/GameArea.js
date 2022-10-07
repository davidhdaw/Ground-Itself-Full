import './GameArea.css'
import CreateJoin from './CreateJoin';
import TimeLength from './TimeLength';

function GameArea({game, setGame}) {

    return (
      <div className='GameArea'>
        {game.phase === 0 && <CreateJoin setGame={setGame} />}
        {game.phase === 1 && <TimeLength game={game} setGame={setGame} />}
      </div>
    );
  }


export default GameArea