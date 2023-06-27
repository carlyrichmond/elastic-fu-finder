import styles from './game.module.scss';

import { InstantSearch, SearchBox } from 'react-instantsearch-hooks-web';
import Client from '@searchkit/instantsearch-client';

import Timer from '../timer/timer';
import Score from '../score/score';
import ResultsList from '../results-list/results-list';

const searchClient = Client({
  url: "http://localhost:3001/api/search"
});

/* eslint-disable-next-line */
export interface GameProps { }

export function Game(props: GameProps) {
  return (
    <div className={styles['container']}>
      <div className={styles['time-and-score-bar']}>
        <Timer />
        <Score />
      </div>
      <div className={styles['document-to-search']}>
        <img className={styles['screenshot']} alt="Searchable page screenshot" src="screenshots/63d2b8a11238d1c27938b6bc.png" />
        <p className={styles['document-snippet']}>Here is a sample of the body we want to see...</p>
      </div>
      <InstantSearch indexName="search-elastic-fu-finder-pages" searchClient={searchClient}>
        <div className={styles['search-box-parent']}>
          <SearchBox classNames={
            {
              root: styles['search-box'],
              form: styles['search-form'],
              input: styles['search-input'],
              submit: styles['search-submit'],
              submitIcon: styles['search-submit-icon'],
              reset: styles['search-reset'],
              resetIcon: styles['search-reset-icon']
            }} />
        </div>
        <ResultsList/>
      </InstantSearch>
    </div>
  );
}

export default Game;
