import './game.css';
import { GameChoices } from '../components/GameChoices/GameChoices';
import { Scoreboard } from '../components/Scoreboard/Scoreboard';
import { useCallback, useState } from 'react';
import { Outcome } from '../types/Scoreboard';

export default function Game() {

  const [outcomes, setOutcomes] = useState<Outcome[]>([])

  const afterPlay = useCallback((outcome: Outcome) => {
    setOutcomes(prev => [outcome, ...prev].slice(0, 10))
  }, [])

  return (
    <div id={'game-container'}>
      <h1 id={'game-title'}>RPSLS Game</h1>
      <p className="instructions">
        Welcome to the game! Make your choice to start playing.
      </p>
        <GameChoices afterPlay={afterPlay}/>
      <div>
        <Scoreboard outcomes={outcomes} reset={() => setOutcomes([])}/>
      </div>
    </div>
  );
}
