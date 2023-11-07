import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './result-position.module.scss';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

export interface ResultPositionProps {
  position: number;
}

export function ResultPosition(props: ResultPositionProps) {

  useEffect(() => {
    
  }, [props.position]);

  return (
    <div className={styles['result-position-container']}>
      <img className={styles['result-position-main-icon']} alt='Result:' src='result-position.png' />
      {
          props.position > -1 ? 
          <p key={props.position} className={styles['position']} data-testid="position">{props.position}</p>
          : <FontAwesomeIcon data-testid="no-result-returned-indicator"
          className={styles['no-result-indicator']} icon={faCircleXmark}
        />
      }
    </div>
  );
}

export default ResultPosition;
