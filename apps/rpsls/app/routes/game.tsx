import './game.css';
import { cache, Suspense } from 'react';
import { gameService } from '../services/game-service';
import { GameChoices } from '../components/GameChoices/GameChoices';

export default function Game() {
  return (
    <div id={'game-container'}>
      <h1 id={'game-title'}>RPSLS Game</h1>
      <p className="instructions">
        Welcome to the game! Make your choice to start playing.
      </p>

      <Suspense fallback={'Loading choices...'}>
        <GameChoices choices={cache(gameService.getChoices)()} />
      </Suspense>
    </div>
  );
}
