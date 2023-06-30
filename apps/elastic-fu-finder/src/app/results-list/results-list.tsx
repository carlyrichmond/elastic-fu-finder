import { Hits, useInstantSearch } from 'react-instantsearch-hooks-web';
import styles from './results-list.module.scss';
import Result from '../result/result';

/* eslint-disable-next-line */
export interface ResultsListProps {}

export function ShowResultsFilter() {
  const { indexUiState, results } = useInstantSearch();

  if (!indexUiState.query) {
    return <p className={styles['hits-message']}>No query specified</p>;
  }

  else if (!results.__isArtificial && results.nbHits === 0) {
    return <p className={styles['hits-message']}>No results available</p>;
  }

  return <Hits hitComponent={Result} />;
}

export function ResultsList(props: ResultsListProps) {
  return (
    <div className={styles['results']}>
          <h2 className={styles['results-header']}>Results</h2>
          <ShowResultsFilter/>
    </div>
  );
}

export default ResultsList;
