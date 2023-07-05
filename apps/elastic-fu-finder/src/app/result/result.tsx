import styles from './result.module.scss';

export interface DocumentResult {
  _id: string,
  _source: Source
}

export interface Source {
  title: string;
  meta_description: string;
}

export function Result(result: {hit: DocumentResult }) {
  const screenshotPath = `screenshots/${result.hit._id}.png`;
  
  return (
    <div className={styles['search-result']}>
      <img className={styles['screenshot']} alt="Web page screenshot" src={screenshotPath} />
      <h3 className={styles['result-title']} data-testid="result-title">{result.hit._source?.title}</h3>
      <p className={styles['result-body']}>{result.hit._source?.meta_description}</p>
    </div>
  );
}

export default Result;
