import styles from './game.module.scss';

import axios from 'axios';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';

import Timer from '../timer/timer';
import Score from '../score/score';
import { DocumentResult, Source } from '../../util/elasticsearch';
import ResultsCollection from '../results-collection/results-collection';

export function Game(this: any) {
  const [document, setDocument] = useState<DocumentResult<Source> | undefined>(
    undefined
  );
  const [documentIds, setDocumentIds] = useState<string[] | undefined>(
    []
  );
  const [priorDocument, setPriorDocument] = useState<DocumentResult<Source> | undefined>(undefined);

  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (documentIds?.length === 0) {
      getAllIds();
    } else if (!document) {
      getNextPage();
    }
  });

  async function getAllIds() {
    try {
      const response = await axios.get('.netlify/functions/ids');
      const ids = response.data?.hits?.hits.map((hit: { _id: string; }) => {
        return hit._id;
      });
      setDocumentIds(ids);

      // get our first page
      getNextPage();
    }
    catch(error) {
      console.log('Unable to get document ids');
    }
  }

  async function getDocument(documentID: string) {
    try {
      const response = await axios.post('.netlify/functions/document', { documentID: documentID });
      const doc: DocumentResult<Source> = response.data?.hits?.hits[0];
      
      setDocument(doc);
    }
    catch(error) {
      console.log('Unable to get current document');
    }
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
    const newScore = score + newPoints;
    setScore(newScore);

    //celebrate
    confetti({origin: { x: 0.9, y: 0.4 }, spread: 180});

    // persist score to local storage
    localStorage.setItem('score', JSON.stringify(newScore));

    // move to next page
    getNextPage();
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
        correctResultId={document?._id}
        updateScore={addPoints.bind(this)}
      />
    </div>
  );
}

export default Game;
