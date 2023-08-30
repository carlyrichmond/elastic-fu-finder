import React from 'react';
import styles from './results-collection.module.scss';
import axios from 'axios';

import Badges, { Badge } from '../badges/badges';
import Loader from '../loader/loader';
import ResultsList from '../results-list/results-list';
import QueryCodeEditor from '../query-code-editor/query-code-editor';
import { DocumentResult, ElasticQueryType, ElasticsearchResult, Source } from '../../util/elasticsearch';

interface ResultCollectionProps {
  correctResultId: string | undefined;
  badges: Set<Badge>;
  updateScore: (points?: number) => void;
}

export function ResultsCollection(props: ResultCollectionProps) {
  const [message, setMessage] = React.useState('No query specified');
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [results, setResults] = React.useState<DocumentResult<Source>[]>([]);

  function getResults(newQuery: string) {
    setShowSpinner(true);

    axios
      .post('.netlify/functions/search', { queryString: newQuery })
      .then((response: { data: ElasticsearchResult<Source> }) => {
        const results = response.data.hits?.hits;
        const queryTypes = response.data.profile?.shards[0].searches.flatMap(search => {
          return search.query.map(element => {
            return element.type;
          })
        });

        setMessage(message);
        setResults(results);

        checkForPageMatch(results);

        if (queryTypes){
          awardBadges(queryTypes);
        }
      })
      .catch((error: Error) => {
        console.log(error);
        setMessage('Unable to obtain results');
      })
      .finally(() => {
        setShowSpinner(false);
      });
  }

  function checkForPageMatch(results: DocumentResult<Source>[]) {
    const matchingResult = isDocumentReturnedInResults(results);

    if (matchingResult) {
      props.updateScore();
    }
  }

  function isDocumentReturnedInResults(results: DocumentResult<Source>[]) {
    return results.find((result) => {
      return result._id === props.correctResultId;
    });
  }

  function awardBadges(queryTypes: ElasticQueryType[]) {
    let bonusPoints = 0;
    props.badges.forEach(badge => {
      if (queryTypes.includes(badge.type) && !badge.isCollected) {
        bonusPoints += badge.bonusPoints;
        badge.isCollected = true;
      }
    });

    props.updateScore(bonusPoints);
  }

  const badgesAwarded: Badge[] = Array.from(props.badges).filter((badge) => { return badge.isCollected});

  return (
    <div className={styles['result-list-container']}>
      <div className={styles['code-and-badges-panel']}>
        <QueryCodeEditor getResults={getResults}/>
        <Badges badges={badgesAwarded} isGameActive={true}/>
      </div>
      
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