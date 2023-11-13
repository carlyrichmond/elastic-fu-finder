import React from 'react';
import styles from './results-list.module.scss';
import Result from '../result/result';
import { DocumentResult, Source } from '../../util/elasticsearch';

interface ResultListProps {
  correctResultId: string | undefined;
  results: DocumentResult<Source>[];
}

export function ResultsList(props: ResultListProps) {
  return (
    <div className={styles['result-list-container']}>
      <div data-testid="result" className={styles['results']}>
        <h2 className={styles['results-header']}>Results</h2>
        <div className={styles['result-cards-container']}>
        {
          props.results && props.results?.length > 0
            ? props.results.map((result) => {
                return (
                  <Result
                    key={result._id}
                    hit={result}
                    correctResultId={props.correctResultId}
                  />
                );
              })
            : 
            <p data-testid="results-message" className={styles['hits-message']}>
              No results available
            </p>
        }
        </div>
      </div>
    </div>
  );
}

export default ResultsList;
