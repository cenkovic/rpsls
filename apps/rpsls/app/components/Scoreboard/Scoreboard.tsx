import './styles.css';
import { Outcome } from '../../types/Scoreboard';

interface ScoreboardProps {
  outcomes: Outcome[];
  reset: () => void;
}

export const Scoreboard = ({outcomes, reset}: ScoreboardProps) => {
  if (outcomes.length === 0) {
    return null
  }
  return (
    <div id={'scoreboard-container'}>
      <table className={'scoreboard-table'}>
        <thead>
          <tr>
            <th>#</th>
            <th>Player</th>
            <th>Computer</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          {outcomes.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.playerChoice}</td>
              <td>{result.computerChoice}</td>
              <td>{result.outcome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center' }}>
        <button className={'reset-scoreboard-btn'} onClick={reset}>Reset Scoreboard</button>
      </div>
    </div>
  );
};
