import { NavLink } from 'react-router';
import './app-nav.css';

export function AppNav() {
  return (
    <div id='nav-bar'>
      <NavLink to="/" end className='styled-link'>
        New Game
      </NavLink>
      <NavLink to="/scoreboard" end className='styled-link'>
        Scoreboard
      </NavLink>
    </div>
  );
}
