import { useMediaQuery } from 'react-responsive';
import styles from './rules.module.scss';

export function Rules() {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)'});

  return (
    <div className={styles['container']}>
      <p className={styles['rules-paragraph']} data-testid="rules-paragraph">
        You have 3 minutes to find as many pages as you can! 
        <br/> Enter Elasticsearch queries in the code editor using the fields in the comment and hit the submit button.
      </p>
      
      <img className={styles['game-screenshot']} src={ isMobile ? './screen-overview-small.png' : './screen-overview-large.png'} 
        alt='Game Screen Layout'/>

      <p className={styles['rules-paragraph']} data-testid="points-paragraph">
        10 points will be added to your score for each page you find within the 10 results returned by Elasticsearch. Badges and bonus points will be earned for each different query type used.
      </p>
      <em>Happy searching!</em>
    </div>
  );
}

export default Rules;
