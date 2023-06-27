import styles from './game.module.scss';

import { InstantSearch, SearchBox, Hits, useInstantSearch} from 'react-instantsearch-hooks-web';
import Client from '@searchkit/instantsearch-client';

import Timer from '../timer/timer';
import Result from '../result/result';
import Score from '../score/score';

const searchClient = Client({
  url: "http://localhost:3001/api/search"
});

/* eslint-disable-next-line */
export interface GameProps { }

function ShowResultsFilter() {
  const { indexUiState, results } = useInstantSearch();

  if (!indexUiState.query) {
    return <p className={styles['hits-message']}>No query specified</p>;
  }

  else if (!results.__isArtificial && results.nbHits === 0) {
    return <p className={styles['hits-message']}>No results available</p>;
  }

  return <Hits hitComponent={Result} />;
}

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
        <div className={styles['results']}>
          <h2 className={styles['results-header']}>Results</h2>
          <ShowResultsFilter/>
        </div>
      </InstantSearch>
    </div>
  );
}

export default Game;
