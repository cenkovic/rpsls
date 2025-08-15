/// <reference types="vite-plugin-svgr/client" />
import './styles.css';
import Rock from '../../icons/rock.svg?react';
import Paper from '../../icons/paper.svg?react';
import Scissors from '../../icons/scissors.svg?react';
import Lizard from '../../icons/lizard.svg?react';
import Spock from '../../icons/spock.svg?react';

const availableGradients = new Map([
  ['rock', 'teal-gradient'],
  ['paper', 'pink-gradient'],
  ['scissors', 'indigo-gradient'],
  ['lizard', 'red-gradient'],
  ['spock', 'lime-gradient'],
]);

const choiceIcons = new Map([
  ['rock', <Rock/>],
  ['paper', <Paper/>],
  ['scissors',<Scissors/>],
  ['lizard', <Lizard/>],
  ['spock',<Spock/>],
])

interface FancyButtonProps {
  choice: string;
  onClick?: () => void;
}

export default function ChoiceButton({ choice, onClick }: FancyButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`button-container ${availableGradients.get(choice.toLowerCase())}`}
    >
      <div className={'svg-wrapper'}>{choiceIcons.get(choice.toLowerCase()) ?? null}</div>
      <span>{choice}</span>
    </div>
  );
}
