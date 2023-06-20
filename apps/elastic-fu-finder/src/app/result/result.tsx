import styles from './result.module.scss';

/* eslint-disable-next-line */
export interface ResultProps {
  hit: any;
}

export function Result(props: ResultProps) {
  const screenshotPath = `screenshots/${props.hit.objectID}.png`;
  
  return (
    <>
      <img className={styles['screenshot']} alt="Web page screenshot" src={screenshotPath} />
      <p className={styles['result']} data-testid="result-element" key={props.hit.objectID}>{props.hit.title}</p>
    </>
  );
}

export default Result;
