/// <reference types="vite-plugin-svgr/client" />
'use client';
import ChoiceButton from '../ChoiceButton/ChoiceButton';
import './styles.css';
import { memo, useCallback, useState } from 'react';
import Fight from '../../icons/fight.svg?react';
import { useChoicesQuery } from '../../hooks/useChoicesQuery';
import { Choice } from '../../types/Choice';
import { Outcome } from '../../types/Scoreboard';
import { usePlayMutation } from '../../hooks/usePlayMutation';

interface GameChoicesProps {
  afterPlay: (outcome: Outcome) => void;
}

export const GameChoices = memo(({ afterPlay }: GameChoicesProps) => {
  const { data: availableChoices = [], isLoading, isError: errorLoadingChoices } = useChoicesQuery();
  const { mutateAsync: play, isPending } = usePlayMutation()
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [outcome, setOutcome] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>()

  const select = useCallback(
    async (choice: Choice) => {
      try {
        setSelectedChoice(choice);
        const { results, computer } = await play(choice.id);
        const computerChoice = availableChoices.find((_) => _.id === computer);
        setComputerChoice(computerChoice ?? null);
        setOutcome(results);
        afterPlay({
          outcome: results,
          playerChoice: choice.name,
          computerChoice: computerChoice?.name ?? '?'
        })
      } catch (e) {
        console.warn(e)
        setError('Ups. Something went wrong...')
      }
    },
    [availableChoices, afterPlay, play]
  );

  if (error) {
    return <div className={'error-message'}>{ error }</div>
  }

  if (errorLoadingChoices) {
    return <div className={'error-message'}>Game is unavailable right now. Please try again later</div>
  }

  if (isLoading) {
    return <div>Loading game choices...</div>
  }

  if (selectedChoice) {
    return (
      <>
        <div id={'button-grid'}>
          <ChoiceButton choice={selectedChoice.name} />
          <Fight width={64} height={64} />
          <ChoiceButton choice={computerChoice?.name ?? '?'} />
        </div>
        <div id={'outcome'}>{isPending ? 'fighting...' : outcome}</div>
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
});
