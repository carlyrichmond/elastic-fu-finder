import { useNavigate } from 'react-router-dom';
import styles from './end.module.scss';
import Score from '../score/score';
import { Badge, Badges } from '../badges/badges';

/* eslint-disable-next-line */
export interface EndProps {
}

export function End(props: EndProps) {
  const navigate = useNavigate();

  const onPlayAgainSelect = () => {
    navigate('/play');
  };

  const badges: Badge[] = [
    { name: 'Vector Search', 
      type: 'KnnScoreDocQuery' as const,
      bonusPoints: 50,
      isCollected: true }
  ];

  return (
    <div data-testid="end" className={styles['container']}>
      <h2 data-testid="game-over-message" className={styles['game-over-message']}>Game Over!</h2>
      <div className={styles['game-score-panel']}>
        <Badges badges={badges} isGameActive={false}/>
        <Score score={100}/>
      </div>
      <button className={styles['play-again-button']} onClick={onPlayAgainSelect}>Play again</button>
    </div>
  );
}

export default End;
