import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './result.module.scss';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { DocumentResult, Source } from '../../util/elasticsearch';

export function Result(props: {
  hit: DocumentResult<Source>;
  correctResultId: string | undefined;
}) {
  const screenshotPath = props.hit._id
    ? `screenshots/63d2b8a11238d1c27938b6bc.webp`//`screenshots/${props.hit._id}.webp`
    : 'undefined.png';
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
