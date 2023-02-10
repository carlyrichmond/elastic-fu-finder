// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import Client from '@searchkit/instantsearch-client';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch-dom';
//import { Route, Routes, Link } from 'react-router-dom';

import Timer from './timer/timer';

const searchClient = Client({
    url: "http://localhost:3000/api/search",
  });

export function App() {
  return (
    <>
      <Timer/>

      <InstantSearch indexName="search-elastic-fu-finder-pages" searchClient={searchClient}>
        <SearchBox/>
        <RefinementList attribute="type" />
        <Hits />
      </InstantSearch>
    </>
  );
}

export default App;
