// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import Client from '@searchkit/instantsearch-client';
import { InstantSearch, SearchBox, RefinementList } from 'react-instantsearch-dom';

import Timer from './timer/timer';
import { PageHits } from './results/results';

const searchClient = Client({
    url: "http://localhost:3001/api/search",
  });

export function App() {
  return (
    <>
      <h1>Elastic Fu-Finder</h1>
      <Timer/>

      <InstantSearch indexName="search-elastic-fu-finder-pages" searchClient={searchClient}>
        <SearchBox/>
        <RefinementList attribute="type" />
        <PageHits />
      </InstantSearch>
    </>
  );
}

export default App;
