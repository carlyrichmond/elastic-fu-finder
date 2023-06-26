import styles from './result.module.scss';

export interface ResultProps {
  hit: any;
}

export function Result(props: ResultProps) {
  const screenshotPath = `screenshots/${props.hit.objectID}.png`;
  
  return (
    <div className={styles['search-result']}>
      <img className={styles['screenshot']} alt="Web page screenshot" src={screenshotPath} />
      <h3 className={styles['result-title']} data-testid="result-title" key={props.hit.objectID}>{props.hit.title}</h3>
      <p className={styles['result-body']}>{props.hit.meta_description}</p>
    </div>
  );
}

export default Result;
