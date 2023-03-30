import styles from './game.module.scss';

import { InstantSearch, SearchBox, RefinementList } from 'react-instantsearch-dom';
import Client from '@searchkit/instantsearch-client';

import { PageHits } from '../results/results';
import Timer from '../timer/timer';

const searchClient = Client({
    url: "http://localhost:3001/api/search",
  });

/* eslint-disable-next-line */
export interface GameProps {}

export function Game(props: GameProps) {
  return (
    <div className={styles['container']}>
      <Timer/>
      
      <InstantSearch indexName="search-elastic-fu-finder-pages" searchClient={searchClient}>
        <SearchBox/>
        <RefinementList attribute="type" />
        <PageHits />
      </InstantSearch>
    </div>
  );
}

export default Game;
