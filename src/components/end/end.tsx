import { useNavigate } from 'react-router-dom';
import styles from './end.module.scss';
import Score from '../score/score';
import { Badges } from '../badges/badges';
import { useEffect, useRef, useState } from 'react';

/* eslint-disable-next-line */
export interface EndProps {
}

export function End(props: EndProps) {
  const [badges, setBadges] = useState([]);
  const [score, setScore] = useState(0);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      const storedBadges = localStorage.getItem('badges');
      if (storedBadges) {
        setBadges(JSON.parse(storedBadges));
      }

      const storedScore = localStorage.getItem('score');
      if (storedScore) {
        setScore(parseInt(storedScore));
      }

      firstUpdate.current = false;
    }
    
  }, []);

  const navigate = useNavigate();
  const onPlayAgainSelect = () => {
    navigate('/play');
  };

  return (
    <div data-testid="end" className={styles['container']}>
      <h2 data-testid="game-over-message" className={styles['game-over-message']}>Game Over!</h2>
      <div className={styles['game-score-panel']}>
        <Badges badges={badges} isGameActive={false}/>
        <Score score={score}/>
      </div>
      <button className={styles['play-again-button']} onClick={onPlayAgainSelect}>Play again</button>
    </div>
  );
}

export default End;
