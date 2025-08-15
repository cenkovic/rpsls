'use client'
import { styled } from 'styled-components';
import ChoiceButton from '../components/ChoiceButton';

const GameContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 90%;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
`;

const Instructions = styled.p`
  font-size: 1.3rem;
  color: #e0e0e0;
  text-align: center;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-content: center;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default function Game() {
  return (
    <GameContainer>
      <Title>Game Page</Title>
      <Instructions>
        Welcome to the game! Make your choice to start playing.
      </Instructions>

      <ButtonGrid>
        <ChoiceButton choice={'Rock'} />
        <ChoiceButton choice={'Paper'} />
        <ChoiceButton choice={'Scissors'} />
        <ChoiceButton choice={'Lizard'} />
        <ChoiceButton choice={'Spock'} />
      </ButtonGrid>
    </GameContainer>
  );
}
