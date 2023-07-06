import React from 'react';
import styles from './results-list.module.scss';
import axios from 'axios';
import Result, { DocumentResult } from '../result/result';
import Loader from '../loader/loader';

export interface ElasticsearchResult {
  hits: { hits: DocumentResult[] }
}

/* eslint-disable-next-line */
export interface ResultsListProps {}

export function ResultsList(props: ResultsListProps) {
  const [query, setQuery] = React.useState('');
  const [message, setMessage] =  React.useState('No query specified');
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [results, setResults] = React.useState<DocumentResult[]>([]);

  function search(event: any) {
    if (event?.key !== 'Enter') {
      return;
    }

    setQuery(event.currentTarget.value);
    getResults(event.currentTarget.value);
  }

  function getResults(newQuery: string) {
    setShowSpinner(true);
    setResults([]);

    axios.post("http://localhost:3001/api/search",
      { queryString: newQuery })
      .then((response: { data: ElasticsearchResult }) => {
        const results = response.data?.hits?.hits;

        if (!results || results.length === 0) {
          setMessage('No results available');
          return;
        }

        setMessage('');
        setResults(results);
      })
      .catch((error) => {
        console.log(error.toJSON());
        setMessage('Unable to obtain results');
      })
      .finally(() => {
        setShowSpinner(false);
      });
  }
  
  return (
    <div className={styles['result-list-container']}>
      <input id="search-bar" defaultValue={query} 
        type="search" placeholder="Find the above page!" 
        aria-label="Search record selection" onKeyUp={search}></input>
      <div data-testid="result" className={styles['results']}>
          <h2 className={styles['results-header']}>Results</h2>
            {
              message && !showSpinner ? <p data-testid="result-message" className={styles['hits-message']}>{message}</p> : ''
            }
            {
              results?.length > 0 ? results.map((result : { _id: string, _source: any }) => {
                return <Result key={result._id} hit={result}/>
              }) : ''
            }
          {
            showSpinner ? <Loader/> : ''
          }
      </div>
    </div>
  );
}

export default ResultsList;