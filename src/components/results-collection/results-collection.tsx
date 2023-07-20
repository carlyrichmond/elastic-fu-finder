import React from 'react';
import styles from './results-collection.module.scss';
import axios from 'axios';
import { DocumentResult } from '../result/result';
import Loader from '../loader/loader';
import ResultsList from '../results-list/results-list';

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
  const [query, setQuery] = React.useState('');
  const [message, setMessage] = React.useState('No query specified');
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [keywordResults, setKeywordResults] = React.useState<DocumentResult[]>([]);
  const [vectorResults, setVectorResults] = React.useState<DocumentResult[]>([]);

  function search(event: any) {
    if (event?.key !== 'Enter') {
      return;
    }

    setQuery(event.currentTarget.value);
    getResults(event.currentTarget.value);
  }

  function getResults(newQuery: string) {
    setShowSpinner(true);

    axios
      .post('.netlify/functions/search', { queryString: newQuery })
      .then((response: { data: ElasticsearchMultiSearchResult }) => {
        const keywordResults = response.data.responses[0].hits?.hits;
        const vectorResults = response.data.responses[1].hits?.hits;

        setMessage(message);
        setKeywordResults(keywordResults);
        setVectorResults(vectorResults);

        checkForPageMatch(keywordResults, vectorResults);
      })
      .catch((error: Error) => {
        console.log(error);
        setMessage('Unable to obtain results');
      })
      .finally(() => {
        setShowSpinner(false);
      });
  }

  function checkForPageMatch(keywordResults: DocumentResult[], vectorResults: DocumentResult[]) {
    const keywordMatchingResult = isDocumentReturnedInResults(keywordResults);
    const vectorMatchingResult = isDocumentReturnedInResults(vectorResults);

    if (keywordMatchingResult || vectorMatchingResult) {
      props.updateScore();
      setQuery('');
    }
  }

  function isDocumentReturnedInResults(results: DocumentResult[]) {
    return results.find((result) => {
      return result._id === props.correctResultId;
    });
  }

  return (
    <div className={styles['result-list-container']}>
      <input
        id="search-bar"
        defaultValue={query}
        type="search"
        placeholder="Find the above page!"
        aria-label="Search record selection"
        onKeyUp={search}>
        </input>
      <div data-testid="result" className={styles['results-collection-container']}>
        {
          showSpinner ? <Loader /> : 
             <div className={styles['results-collection']}>
              <ResultsList correctResultId={props.correctResultId} resultsType='Keyword' results={keywordResults}/>
              <ResultsList correctResultId={props.correctResultId} resultsType='Vector' results={vectorResults}/>
            </div>
        }
      </div>
    </div>
  );
}

export default ResultsCollection;