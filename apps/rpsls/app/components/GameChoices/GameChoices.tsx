/// <reference types="vite-plugin-svgr/client" />
'use client';
import ChoiceButton from '../ChoiceButton/ChoiceButton';
import './styles.css';
import { use, useCallback, useState } from 'react';
import { gameService } from '../../services/game-service';
import Fight from '../../icons/fight.svg?react';

interface Choice {
  id: number;
  name: string;
}

interface GameChoicesProps {
  choices: Promise<Choice[]>;
}

export const GameChoices = ({ choices }: GameChoicesProps) => {
  const availableChoices = use(choices);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const select = useCallback(
    async (choice: Choice) => {
      setIsSubmitting(true);
      try {
        setSelectedChoice(choice);
        const { results, computer } = await gameService.play(choice.id);
        setComputerChoice(
          availableChoices.find((_) => _.id === computer) ?? null
        );
        setOutcome(results);
      } catch (e) {
        // do something
      } finally {
        setIsSubmitting(false);
      }
    },
    [availableChoices]
  );

  if (selectedChoice) {
    return (
      <>
        <div id={'button-grid'}>
          <ChoiceButton choice={selectedChoice.name} />
          <Fight width={64} height={64} />
          <ChoiceButton choice={computerChoice?.name ?? '?'} />
        </div>
        <div id={'outcome'}>{isSubmitting ? 'fighting...' : outcome}</div>
        {outcome && (
          <div style={{ marginTop: '1rem' }}>
            <button
              className={'new-game-button'}
              onClick={() => {
                setSelectedChoice(null);
                setComputerChoice(null);
                setOutcome(null);
              }}
            >
              New Game
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <div id={'button-grid'}>
      {availableChoices.map((choice) => (
        <ChoiceButton
          choice={choice.name}
          key={choice.id}
          onClick={() => select(choice)}
        />
      ))}
    </div>
  );
};
