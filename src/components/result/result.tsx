import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './result.module.scss';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';

export interface DocumentResult {
  _id: string;
  _source: Source;
}

export interface Source {
  title: string;
  meta_description: string;
}

export function Result(props: {
  hit: DocumentResult;
  correctResultId: string | undefined;
}) {
  const screenshotPath = props.hit._id
    ? `screenshots/${props.hit._id}.png`
    : 'screenshots/undefined.png';
  const isCorrectResult = props.hit._id === props.correctResultId;

  return (
    <div className={styles['search-result']}>
      <img
        className={styles['screenshot']}
        alt="Web page screenshot"
        src={screenshotPath}
      />
      <div className={styles['document-text']}>
        <h3 className={styles['result-title']} data-testid="result-title">
          {props.hit._source?.title}
        </h3>
        <p className={styles['result-body']}>
          {props.hit._source?.meta_description}
        </p>
      </div>
      <FontAwesomeIcon
        data-testid="result-indicator"
        icon={isCorrectResult ? faCircleCheck : faCircleXmark}
      />
    </div>
  );
}

export default Result;
