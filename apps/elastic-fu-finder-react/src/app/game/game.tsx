import styles from './game.module.scss';

import axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons';

import Timer from '../timer/timer';
import Score from '../score/score';
import { ElasticsearchResult, ResultsList } from '../results-list/results-list';
import { DocumentResult } from '../result/result';

export function Game(this: any) {
  const [document, setDocument] = React.useState<DocumentResult | undefined>(
    undefined
  );
  const [documentIds, setDocumentIds] = React.useState<string[] | undefined>(
    []
  );
  const [priorDocument, setPriorDocument] = React.useState<
    DocumentResult | undefined
  >(undefined);

  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    if (documentIds?.length === 0) {
      getAllIds();
    } else if (!document) {
      getNextPage();
    }
  });

  function getAllIds() {
    axios
      .get('http://localhost:3001/api/ids')
      .then((response: { data: ElasticsearchResult }) => {
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

  function getDocument(documentID: string) {
    axios
      .post('http://localhost:3001/api/document', { documentID: documentID })
      .then((response: { data: ElasticsearchResult }) => {
        const doc: DocumentResult = response.data?.hits?.hits[0];
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

  function addPoints() {
    setScore(score + 10);
    getNextPage();
  }

  return (
    <div className={styles['container']}>
      <div className={styles['time-and-score-bar']}>
        <Timer />
        <Score score={score} />
      </div>
      <div className={styles['document-to-search']}>
        <img
          data-testid="screenshot"
          className={styles['screenshot']}
          alt="Searchable page screenshot"
          src={`screenshots/${document?._id}.png`}
        />
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
          data-testid="previous-button"
          className={styles['previous-button']}
          aria-label="Previous Document"
          disabled={!priorDocument}
          onClick={getPreviousPage}
        >
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
        <button
          data-testid="next-button"
          className={styles['next-button']}
          aria-label="Next Document"
          onClick={getNextPage}
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>
      <ResultsList
        updateScore={addPoints.bind(this)}
        correctResultId={document?._id}
      />
    </div>
  );
}

export default Game;
