import React from 'react';
import styles from './results-list.module.scss';
import Result, { DocumentResult } from '../result/result';

interface ResultListProps {
  correctResultId: string | undefined;
  results: DocumentResult[];
}

export function ResultsList(props: ResultListProps) {
  return (
    <div className={styles['result-list-container']}>
      <div data-testid="result" className={styles['results']}>
        <h3 className={styles['results-header']}>Results</h3>
        {
          props.results && props.results?.length > 0
            ? props.results.map((result: { _id: string; _source: any }) => {
                return (
                  <Result
                    key={result._id}
                    hit={result}
                    correctResultId={props.correctResultId}
                  />
                );
              })
            : 
            <p data-testid="result-message" className={styles['hits-message']}>
              No results available
            </p>
        }
      </div>
    </div>
  );
}

export default ResultsList;
