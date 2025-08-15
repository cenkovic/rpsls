/// <reference types="vite-plugin-svgr/client" />
import { styled } from 'styled-components';
import Rock from '../icons/rock.svg?react';
import Paper from '../icons/paper.svg?react';
import Scissors from '../icons/scissors.svg?react';
import Lizard from '../icons/lizard.svg?react';
import Spock from '../icons/spock.svg?react';

const availableGradients = new Map([
  // 1. Teal to Aqua
  ['rock', 'linear-gradient(135deg, #009688, #80deea)'],
  // 2. Pink to Magenta
  ['paper', 'linear-gradient(135deg, #ec407a, #d81b60)'],
  // 3. Indigo to Blue
  ['scissors', 'linear-gradient(135deg, #3f51b5, #2196f3)'],
  // 4. Red to Copper
  ['lizard', 'linear-gradient(135deg, #f44336, #e57373)'],
  // 5. Lime to Bright Green (Reversed for better white-text contrast)
  ['spock', 'linear-gradient(135deg, #8bc34a, #4caf50)'],
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

const ButtonContainer = styled.button<{$gradient?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.$gradient ?? 'linear-gradient(135deg, #9c27b0, #6a1b9a)'};
  border: none;
  width: 100%;
  border-radius: 12px;
  padding: 1rem 2rem;
  cursor: pointer;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;
  gap: 0.75rem; /* Space between SVG and text */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px); /* Slight lift on hover */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4); /* Slightly deeper shadow */
  }

  &:active {
    transform: translateY(0); /* Reset lift on click */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Reduced shadow */
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }
`;

const SvgWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 32px;
    height: 32px;
    fill: #fff;
    transition: fill 0.2s;
  }
`;

export default function ChoiceButton({ choice, onClick }: FancyButtonProps) {
  return (
    <ButtonContainer onClick={onClick} $gradient={availableGradients.get(choice.toLowerCase())}>
      <SvgWrapper>{choiceIcons.get(choice.toLowerCase()) ?? null}</SvgWrapper>
      <span>{choice}</span>
    </ButtonContainer>
  );
}
