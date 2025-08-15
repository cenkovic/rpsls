import ChoiceButton from '../components/ChoiceButton/ChoiceButton';
import './game.css'

export default function Game() {
  return (
    <div id={'game-container'}>
      <h1 id={'game-title'}>Game Page</h1>
      <p className='instructions'>
        Welcome to the game! Make your choice to start playing.
      </p>

      <div id={'button-grid'}>
        <ChoiceButton choice={'Rock'} />
        <ChoiceButton choice={'Paper'} />
        <ChoiceButton choice={'Scissors'} />
        <ChoiceButton choice={'Lizard'} />
        <ChoiceButton choice={'Spock'} />
      </div>
    </div>
  );
}
