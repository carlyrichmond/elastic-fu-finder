import styles from './rules.module.scss';

export function Rules() {

  return (
    <div className={styles['container']}>
      <p className={styles['rules-paragraph']} data-testid="rules-paragraph">
        You have 3 minutes to find as many pages as you can! Enter your queries in the search bar and hit enter.
      </p>
      
      <img className={styles['game-screenshot']} src='./screen-overview.png' alt='Game Screen Layout'/>

      <p className={styles['rules-paragraph']} data-testid="points-paragraph">
        10 points will be added to your score for each page you find within the 10 results returned by Elasticsearch.
      </p>
      <em>Happy searching!</em>
    </div>
  );
}

export default Rules;
