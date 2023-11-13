import styles from './results-message.module.scss';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

/* eslint-disable-next-line */
export interface ResultsMessageProps {
  resultsPosition: number | undefined;
  hasGameInitialized: boolean;
}

export function ResultsMessage(props: ResultsMessageProps) {
  const winMessage: string = 'Win!';
  const notFoundMessage: string = 'Try again!'
  const startMessage: string = 'Go!';

  const [message, setMessage] = useState('Go!');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.resultsPosition === undefined && !props.hasGameInitialized) {
      setMessage(startMessage);
      setIsVisible(true);
    } else if (props.resultsPosition !== undefined && props.resultsPosition > -1) {
      setMessage(winMessage);
      setIsVisible(true);

      confetti({ origin: { x: 0.5, y: 0.8 }, particleCount: 200, spread: 180 });
    } else if (props.resultsPosition === -1) {
      setMessage(notFoundMessage);
      setIsVisible(true);
    }
    setTimeout(clearMessage, 1500)
  }, [props.hasGameInitialized, props.resultsPosition]);

  function clearMessage() {
    setIsVisible(false);
  }

  return (
    <p data-testid="results-message"
      className={isVisible ? styles['find-message'] : styles['hidden-message']}>{message}
    </p>
  );
}

export default ResultsMessage;
