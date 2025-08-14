/// <reference types="vite-plugin-svgr/client" />
import { styled } from 'styled-components';
import Paper from '../icons/paper.svg?react'

const GameContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 90%; /* Adjust max width on smaller screens */
    padding: 1rem; /* Adjust padding */
  }
`;

const Title = styled.h1`
  font-size: 2.5rem; /* Larger font for a bold header */
  color: #ffffff; /* White text for contrast */
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif; /* Consistent font with global style */
`;

const Instructions = styled.p`
  font-size: 1.3rem; /* Slightly larger for readability */
  color: #e0e0e0; /* Softer text color */
  text-align: center; /* Center-align text for instructions */
  font-family: 'Inter', sans-serif; /* Consistent font */
  line-height: 1.6; /* Better line spacing for readability */
`;

export default function Game() {
  return (
    <GameContainer>
      <Title>Game Page</Title>
      <Instructions>
        Welcome to the game! Make your choice to start playing. <Paper width={100} height={100} fill={'#ff0000'}/>
      </Instructions>
    </GameContainer>
  );
}
