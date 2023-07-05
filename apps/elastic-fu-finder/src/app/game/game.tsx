import styles from './game.module.scss';

import axios from 'axios';
import React from 'react';

import Timer from '../timer/timer';
import Score from '../score/score';
import ResultsList, { ElasticsearchResult } from '../results-list/results-list';
import { Source } from '../result/result';

/* eslint-disable-next-line */
export interface GameProps { }

export function Game(props: GameProps) {
  const [document, setDocument] = React.useState<Source | undefined>(undefined);

  React.useEffect(() => {
    if (!document){
      getDocument();
    }
  })

  function getDocument() {
    axios.post("http://localhost:3001/api/document", 
    { documentID: "63d2b8a11238d1c27938b6bc" })
    .then((response: { data: ElasticsearchResult }) => {
      const source: Source = response.data?.hits?.hits[0]?._source;
      setDocument(source);
    })
    .catch((error) => {
      console.log(error.toJSON());
    });
  }

  return (
    <div className={styles['container']}>
      <div className={styles['time-and-score-bar']}>
        <Timer/>
        <Score/>
      </div>
      <div className={styles['document-to-search']}>
        <img data-testid="screenshot" className={styles['screenshot']} alt="Searchable page screenshot" src="screenshots/63d2b8a11238d1c27938b6bc.png" />
        <div className={styles['document-details']}>
          <h1 className={styles['document-header']}>{document?.title}</h1>
          <p className={styles['document-snippet']}>{document?.meta_description}</p>
        </div>
      </div>
      <ResultsList/>
    </div>
  );
}

export default Game;
