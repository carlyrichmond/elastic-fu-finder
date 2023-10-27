import { useEffect, useState } from 'react';
import styles from './results-collection.module.scss';
import axios from 'axios';
import confetti from 'canvas-confetti';

import Badges, { Badge } from '../badges/badges';
import Loader from '../loader/loader';
import ResultsList from '../results-list/results-list';
import QueryCodeEditor from '../query-code-editor/query-code-editor';
import { DocumentResult, ElasticQueryType, Source } from '../../util/elasticsearch';

interface ResultCollectionProps {
  correctResultId: string | undefined;
  updateScore: (points?: number) => void;
}

export function ResultsCollection(props: ResultCollectionProps) {
  const [message, setMessage] = useState('No query specified');
  const [showSpinner, setShowSpinner] = useState(false);
  const [results, setResults] = useState<DocumentResult<Source>[]>([]);

  const [badges, setBadges] = useState<Badge[]>([]);
  const [badgesAwarded, setBadgesAwarded] = useState<Badge[]>([]);

  useEffect(() => {
    if (badges?.length === 0) {
      getBadges();
    }
  });

  async function getBadges() {
    try {
      const response = await axios.get('.netlify/functions/badges');
      const allBadges = response.data?.hits?.hits.map((hit: { _source: { name: any; type: any; points: any; }; }) => {
        return { name: hit._source.name, type: hit._source.type, 
          bonusPoints: hit._source.points, isCollected: false };
      });

      setBadges(allBadges);

    }
    catch(error) {
      console.log('Unable to get badges');
    }
  }

  async function getResults(newQuery: string) {
    setShowSpinner(true);

    try {
      const response = await axios.post('.netlify/functions/search', { queryString: newQuery });
      const results = response.data.hits?.hits;
      const queryTypes = response.data.profile?.shards[0].searches.flatMap((search: { query: any[]; }) => {
          return search.query.map((element: { type: any; }) => {
            return element.type;
          })
        });

        setMessage(message);
        setResults(results);

        checkForPageMatch(results);

        if (queryTypes){
          awardBadges(queryTypes);
        }
    }
    catch(error) {
      console.log('Unable to get results');
    }
    finally {
        setShowSpinner(false);
      }
  }

  function checkForPageMatch(results: DocumentResult<Source>[]) {
    const matchingResult = isDocumentReturnedInResults(results);

    if (matchingResult) {
      props.updateScore();
      //celebrate
    confetti({origin: { x: 0.5, y: 0.8 }, particleCount: 200, spread: 180});
    }
  }

  function isDocumentReturnedInResults(results: DocumentResult<Source>[]) {
    return results.find((result) => {
      return result._id === props.correctResultId;
    });
  }

  function awardBadges(queryTypes: ElasticQueryType[]) {
    let bonusPoints = 0;
    badges.forEach(badge => {
      if (queryTypes.includes(badge.type) && !badge.isCollected) {
        bonusPoints += badge.bonusPoints;
        badge.isCollected = true;
      }
    });

    props.updateScore(bonusPoints);

    // update awarded badges
    const newBadges = badges.filter((badge) => { return badge.isCollected}); 
    setBadgesAwarded(newBadges);
    localStorage.setItem('badges', JSON.stringify(newBadges));
  }

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