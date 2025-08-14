import { availableChoices } from './choices';
import { ChoiceOption } from '../types/Choice';

export const randomNumber = async (): Promise<number> => {
  const response = await fetch('https://codechallenge.boohma.com/random');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return (await response.json() as {random_number: number}).random_number;
}

export const getRandomChoiceOption = async (): Promise<ChoiceOption> => {
  const rand = await randomNumber();
  const choiceIndex = Math.floor(rand % availableChoices.length)
  return availableChoices[choiceIndex]
}
