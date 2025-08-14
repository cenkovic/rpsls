import { ChoiceId } from '../types/Choice';
import { BattleResults } from '../types/Play';

export const rpslsMap: Map<ChoiceId, ChoiceId[]> = new Map([
  [1, [3, 4]], // rock crushes lizard and scissors
  [2, [1, 5]], // paper covers rock and disproves spock
  [3, [2, 4]], // scissors cuts paper and decapitates lizard,
  [4, [2, 5]], // lizard eats paper and poisons spock,
  [5, [1, 3]], // spock smashes scissors and vaporizes rock,
])

export const resolveBattle = (playerChoiceId: ChoiceId, computerChoiceId: ChoiceId): BattleResults => {
  if (playerChoiceId === computerChoiceId) {
    return 'tie';
  }
  const playerChoices = rpslsMap.get(playerChoiceId);
  if (!playerChoices) {
    throw new Error('Invalid player choice');
  }
  return playerChoices.includes(computerChoiceId) ? 'win' : 'lose';
}
