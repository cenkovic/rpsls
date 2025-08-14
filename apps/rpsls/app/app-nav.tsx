import { NavLink } from 'react-router';
import { styled } from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1); /* Semi-transparent bar */
  padding: 1rem;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack links on smaller screens */
    gap: 1rem;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  font-size: 1.2rem;

  &.active {
    font-weight: 700;
    text-decoration: underline;
  }

  &:hover {
    opacity: 0.9;
  }
`;

export function AppNav() {
  return (
    <NavBar>
      <StyledLink to="/" end>
        New Game
      </StyledLink>
      <StyledLink to="/scoreboard" end>
        Scoreboard
      </StyledLink>
    </NavBar>
  );
}
