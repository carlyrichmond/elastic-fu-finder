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

      if (difference <= 0) {
      }

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

  // Handle :00 seconds case with minimumIntegerDigits option
  const formattedSeconds = seconds.toLocaleString(undefined, {
    minimumIntegerDigits: 2,
  });

  return (
    <div data-testid="timer" className={styles['container']}>
      <img
        className={styles['timer-icon']}
        src="time-icon.png"
        alt="Time remaining"
      />
      {!isTargetTime ? (
        <h3 className={styles['time-remaining']}>
          {minutes}:{formattedSeconds}
        </h3>
      ) : (
        <h3 className={styles['time-remaining']}>FIN</h3>
      )}
    </div>
  );
}

export default Timer;
