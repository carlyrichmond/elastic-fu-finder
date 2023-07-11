# Elastic-fu Finder

## Search Game for Teaching Search Using Elasticsearch

This monorepo project, generated using [Nx](https://nx.dev), contains the full implementation of Fu-Finder using Elasticsearch. This game is a reincarnation of [Fu-Finder](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=557f75dc9f1252639566822d9cb94496b2fc785a) developed by the author examining query behaviour. It is in the process of being revamped to show the differences in query behaviour required for keyword and semantic search, or vector search.

![Fu-Finder Web Screenshot](./docs/screenshots/fu-finder-web.png)

### Project Structure

This repo contains the following application layers:

1. [elastic-fu-finder-react](./apps/elastic-fu-finder/): [React](https://reactjs.org) and Typescript UI
2. [elastic-fu-finder-server](./apps/elastic-fu-finder-server/): Express Typescript Server
3. [elastic-fu-finder-e2e](./apps/elastic-fu-finder-e2e/): Cypress E2E Testing Suite

### Running Locally

The UI and server projects both need to be running to play the game locally. 

#### Initial Setup

Before running locally please ensure you have the following pre-requisites installed:

1. [Nx global install](https://nx.dev/getting-started/installation#installing-nx-globally)
2. [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

The `npm` dependencies must be installed before running the application:

```sh
npm install
```
#### Run

Running both the UI and server components can be done using the `nx serve` command. Note that the cloud ID and API key for your Elastic cloud deployment is required to start the server.

```sh
nx serve elastic-fu-finder-react &

export ELASTIC_CLOUD_ID=my-elastic-deployment-cloud-id
export ELASTIC_API_KEY=my-api-key
nx serve elastic-fu-finder-server &
```

The UI is accessible via the web browser at `http://localhost:4200`. The availability of the server can be checked in a browser by going to `http://localhost:3001/`.

### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `nx run elastic-fu-finder-react-e2e:e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

### Resources

#### Development Resources

1. [Nx Documentation](https://nx.dev)
2. [React](https://reactjs.org)
3. [Elasticsearch Node.js/ JavaScript Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)

#### Academic Resources

For those interested in the original Fu-Finder game, and the inspiring game PageHunt, check out the below academic papers and resources.

1. [Fu-Finder: A Game for Studying Querying Behaviours](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=557f75dc9f1252639566822d9cb94496b2fc785a)
2. [Page Hunt: Improving Search Engines Using
Human Computation Games](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=cd51ccd0dd2dbb1065671ad1637ebd570ecab1eb)
3. [Internet Widgets- GWAP from Bing: Page Hunt](http://internetwidgets.blogspot.com/2009/11/gwap-from-bing-page-hunt.html)

#### IR Datasets

For Elastic-fu Finder, we used a subset of the [top 10 million websites](https://www.domcop.com/top-10-million-websites) as calculated via the [Open PageRank initiative](https://www.domcop.com/openpagerank/what-is-openpagerank). Open PageRank uses a couple of sources for it's website dataset, including [Common Crawl](https://commoncrawl.org/).
