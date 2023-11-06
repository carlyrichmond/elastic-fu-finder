import styles from './results-message.module.scss';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

/* eslint-disable-next-line */
export interface ResultsMessageProps {
  hasFoundResults: boolean;
  hasSubmittedQuery: boolean;
}

export function ResultsMessage(props: ResultsMessageProps) {
  const winMessage: string = 'Win!';
  const notFoundMessage: string = 'Try again!'

  const [message, setMessage] = useState(notFoundMessage);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (props.hasSubmittedQuery) {
      setIsVisible(true);
    }

      if (props.hasFoundResults) {
        setMessage(winMessage);
        confetti({origin: { x: 0.5, y: 0.8 }, particleCount: 200, spread: 180});
      } else {
        setMessage(notFoundMessage);
      }
    setTimeout(clearMessage, 1500)
  }, [props.hasFoundResults, props.hasSubmittedQuery]);

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
