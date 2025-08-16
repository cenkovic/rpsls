import { resolveBattle, rpslsMap } from './play';
import { ChoiceId } from '../types/Choice';
import { BattleResults } from '../types/Play';

describe('resolveBattle', () => {
  it('should return "tie" when both player and computer select the same choice', () => {
    const result: BattleResults = resolveBattle(1, 1); // Rock vs Rock
    expect(result).toBe('tie');
  });

  it('should return "win" when player choice beats computer choice', () => {
    // Iterate through all valid player choices and their winning cases
    rpslsMap.forEach((computerChoices, playerChoice) => {
      computerChoices.forEach(computerChoice => {
        const result: BattleResults = resolveBattle(playerChoice, computerChoice);
        expect(result).toBe('win');
      });
    });
  });

  it('should return "lose" when computer choice beats player choice', () => {
    // Iterate through all valid player choices and their losing cases
    rpslsMap.forEach((computerChoices, playerChoice) => {
      const losingChoices = Array.from(rpslsMap.keys()).filter(
        (key) => key !== playerChoice && !computerChoices.includes(key)
      );
      losingChoices.forEach(computerChoice => {
        const result: BattleResults = resolveBattle(playerChoice, computerChoice);
        expect(result).toBe('lose');
      });
    });
  });

  it('should throw an error when an invalid player choice is provided', () => {
    const invalidPlayerChoice: ChoiceId = 999 as ChoiceId; // Invalid choice
    expect(() => resolveBattle(invalidPlayerChoice, 1)).toThrow('Invalid player choice');
  });
});
