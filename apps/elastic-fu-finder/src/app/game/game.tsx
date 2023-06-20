import styles from './game.module.scss';

import { InstantSearch, SearchBox, RefinementList, Hits } from 'react-instantsearch-hooks-web';
import Client from '@searchkit/instantsearch-client';

import Timer from '../timer/timer';
import Result from '../result/result';

const searchClient = Client({
    url: "http://localhost:3001/api/search"
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
        <Hits hitComponent={Result}/>
      </InstantSearch>
    </div>
  );
}

export default Game;
