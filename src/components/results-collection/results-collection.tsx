import React from 'react';
import styles from './results-collection.module.scss';
import axios from 'axios';
import { DocumentResult } from '../result/result';
import Loader from '../loader/loader';
import ResultsList from '../results-list/results-list';
import QueryCodeEditor from '../query-code-editor/query-code-editor';

export interface ElasticsearchResult {
  hits: { hits: DocumentResult[] };
}

export interface ElasticsearchMultiSearchResult {
  responses: Array<ElasticsearchResult>;
}

interface ResultCollectionProps {
  correctResultId: string | undefined;
  updateScore: () => void;
}

export function ResultsCollection(props: ResultCollectionProps) {
  const [message, setMessage] = React.useState('No query specified');
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [results, setResults] = React.useState<DocumentResult[]>([]);

  function getResults(newQuery: string) {
    setShowSpinner(true);

    axios
      .post('.netlify/functions/search', { queryString: newQuery })
      .then((response: { data: ElasticsearchResult }) => {
        const results = response.data.hits?.hits;

        setMessage(message);
        setResults(results);

        checkForPageMatch(results);
      })
      .catch((error: Error) => {
        console.log(error);
        setMessage('Unable to obtain results');
      })
      .finally(() => {
        setShowSpinner(false);
      });
  }

  function checkForPageMatch(results: DocumentResult[]) {
    const matchingResult = isDocumentReturnedInResults(results);

    if (matchingResult) {
      props.updateScore();
    }
  }

  function isDocumentReturnedInResults(results: DocumentResult[]) {
    return results.find((result) => {
      return result._id === props.correctResultId;
    });
  }

  return (
    <div className={styles['result-list-container']}>
      <QueryCodeEditor getResults={getResults}/>
      <div data-testid="result" className={styles['results-collection-container']}>
        {
          showSpinner ? <Loader /> : 
             <div className={styles['results-collection']}>
              <ResultsList correctResultId={props.correctResultId} results={results}/>
            </div>
        }
      </div>
    </div>
  );
}

export default ResultsCollection;