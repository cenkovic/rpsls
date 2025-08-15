'use client'
import ChoiceButton from '../ChoiceButton/ChoiceButton';
import './styles.css';
import { use } from 'react';

interface GameChoicesProps {
  choices: Promise<{id: number, name: string}[]>
}

export const GameChoices = ({choices}: GameChoicesProps) => {
  const availableChoices = use(choices);
  return (
    <div id={'button-grid'}>
      {availableChoices.map((choice) => (
        <ChoiceButton choice={choice.name} key={choice.id}/>
      ))}
    </div>
  );
};
