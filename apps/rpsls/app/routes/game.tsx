import './game.css';
import { cache, Suspense, useMemo } from 'react';
import { gameService } from '../services/game-service';
import { GameChoices } from '../components/GameChoices/GameChoices';

export default function Game() {
  const choicesPromise = useMemo(() => cache(gameService.getChoices), []);
  return (
    <div id={'game-container'}>
      <h1 id={'game-title'}>RPSLS Game</h1>
      <p className="instructions">
        Welcome to the game! Make your choice to start playing.
      </p>

      <Suspense fallback={'Loading choices...'}>
        <GameChoices choices={choicesPromise()} />
      </Suspense>
    </div>
  );
}
