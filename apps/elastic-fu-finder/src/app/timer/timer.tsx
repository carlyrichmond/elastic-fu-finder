import styles from './timer.module.scss';

import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface TimerProps {}

export function Timer(props: TimerProps) {
  const gameTimeInMinutes = 3;

  const [isTargetTime, setIsTargetTime] = useState(false);
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const targetDateTime = new Date();
    targetDateTime.setMinutes(targetDateTime.getMinutes() + gameTimeInMinutes);

    const interval = setInterval(() => {
      const currentDateTime = new Date();

      const difference = targetDateTime.getTime() - currentDateTime.getTime();

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (m <= 0 && s <= 0) {
        setIsTargetTime(true);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid='timer' className={styles['container']}>
      {
        !isTargetTime ? (
          <h1>{minutes}:{seconds}</h1>
        ) : <h1>FIN</h1>
      }
    </div>
  );
}

export default Timer;
