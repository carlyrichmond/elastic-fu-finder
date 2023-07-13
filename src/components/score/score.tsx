import styles from './score.module.scss';

/* eslint-disable-next-line */
export interface ScoreProps {
  score: number;
}

export function Score(props: ScoreProps) {
  const formattedScore = props.score
    ? props.score?.toLocaleString(navigator.language)
    : 0;
  return (
    <div className={styles['score-container']}>
      {/* Passing browser language to format numbers as per locale */}
      <h2 className={styles['score']}>{formattedScore}</h2>
      <img className={styles['score-icon']} alt="Score:" src="piggy-bank.png" />
    </div>
  );
}

export default Score;
