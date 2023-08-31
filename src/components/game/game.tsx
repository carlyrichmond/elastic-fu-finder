import styles from './game.module.scss';

import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';

import { Badge } from '../badges/badges';
import Timer from '../timer/timer';
import Score from '../score/score';
import { DocumentResult, Source, ElasticsearchResult, BadgeSource } from '../../util/elasticsearch';
import ResultsCollection from '../results-collection/results-collection';

export function Game(this: any) {
  const [document, setDocument] = React.useState<DocumentResult<Source> | undefined>(
    undefined
  );
  const [documentIds, setDocumentIds] = React.useState<string[] | undefined>(
    []
  );
  const [priorDocument, setPriorDocument] = React.useState<DocumentResult<Source> | undefined>(undefined);

  const [score, setScore] = React.useState<number>(0);
  const [badges, setBadges] = React.useState<Set<Badge>>(new Set());

  React.useEffect(() => {
    if (documentIds?.length === 0) {
      getAllIds();
    } else if (!document) {
      getNextPage();
    }

    if (badges?.size === 0) {
      getBadges();
    }
  });

  function getAllIds() {
    axios
      .get('.netlify/functions/ids')
      .then((response: { data: ElasticsearchResult<Document> }) => {
        const ids = response.data?.hits?.hits.map((hit) => {
          return hit._id;
        });
        setDocumentIds(ids);

        // get our first page
        getNextPage();
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }

  function getBadges() {
    axios
      .get('.netlify/functions/badges')
      .then((response: { data: ElasticsearchResult<BadgeSource> }) => {
        let badges: Set<Badge> = new Set();
        if (response.data?.hits?.hits) {
          badges = new Set(response.data?.hits?.hits.map((hit) => {
            return { name: hit._source.name, type: hit._source.type, 
              bonusPoints: hit._source.points, isCollected: false };
          }));
        }
        
        setBadges(badges);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }

  function getDocument(documentID: string) {
    axios
      .post('.netlify/functions/document', { documentID: documentID })
      .then((response: { data: ElasticsearchResult<Source> }) => {
        const doc: DocumentResult<Source> = response.data?.hits?.hits[0];
        setDocument(doc);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }

  function getPreviousPage() {
    setDocument(priorDocument);
    setPriorDocument(undefined);
  }

  function getNextPage() {
    if (!documentIds || documentIds?.length === 0) {
      return;
    }

    setPriorDocument(document);
    const factor =
      documentIds && documentIds?.length > 0 ? documentIds.length : 1;
    const randomNextPageIndex = Math.floor(Math.random() * factor);

    getDocument(documentIds[randomNextPageIndex]);
  }

  function addPoints(points?: number) {
    const newPoints  = points ? points : 10;
    setScore(score + newPoints);

    // persist score to local storage
    localStorage.setItem('score', JSON.stringify(score));
  }

  return (
    <div className={styles['container']}>
      <div className={styles['time-and-score-bar']}>
        <Timer gameTimeInMinutes={3}/>
        <Score score={score}/>
      </div>
      <div className={styles['document-to-search']}>
        <img
          data-testid='screenshot'
          className={styles['screenshot']}
          alt='Searchable page screenshot'
          src={`screenshots/${document?._id}.png`}/>
        <div className={styles['document-details']}>
          <h1 className={styles['document-header']}>
            {document?._source.title}
          </h1>
          <p className={styles['document-snippet']}>
            {document?._source.meta_description}
          </p>
        </div>
      </div>
      <div className={styles['page-controls']}>
        <button
          data-testid='previous-button'
          className={styles['previous-button']}
          aria-label='Previous Document'
          disabled={!priorDocument}
          onClick={getPreviousPage}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button
          data-testid='next-button'
          className={styles['next-button']}
          aria-label='Next Document'
          onClick={getNextPage}>
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>
      <ResultsCollection
        badges={badges}
        correctResultId={document?._id}
        updateScore={addPoints.bind(this)}
      />
    </div>
  );
}

export default Game;
