import styles from './score.module.scss';

/* eslint-disable-next-line */
export interface ScoreProps {}

const score = 0;

export function Score(props: ScoreProps) {
  return (
    <div className={styles['score-container']}>
      {/* Passing browser language to format numbers as per locale */ }
      <h2 className={styles['score']}>{score.toLocaleString(navigator.language)}</h2>
      <img className={styles['score-icon']} alt="Score:" src="piggy-bank.png"/>
    </div>
  );
}

export default Score;
