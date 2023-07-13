# Elastic-fu Finder

## Search Game for Teaching Search Using Elasticsearch

This project contains the full implementation of Fu-Finder using Elasticsearch. This game is a reincarnation of [Fu-Finder](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=557f75dc9f1252639566822d9cb94496b2fc785a) developed by the author examining query behaviour. It is in the process of being revamped to show the differences in query behaviour required for keyword and semantic search, or vector search.

![Fu-Finder Web Screenshot](./docs/screenshots/fu-finder-web.png)

### Project Structure

This repo contains the following application layers:

1. A [React](https://reactjs.org) and Typescript UI, present under the [`src` folder](./src/)
2. Typescript Netlify functions accessible under the [`functions` folder](./src/functions/)
3. [Utility functions](./src/util/elasticsearch.ts) for accessing [Elaticsearch](https://www.elastic.co/what-is/elasticsearch) via the [Elasticsearch Node.js client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/getting-started-js.html)

### Running Locally

The UI and Netlify functions both need to be running to play the game locally. 

#### Initial Setup

Before running locally please ensure you have the following pre-requisites installed:

1. [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. [Netlify CLI](https://www.netlify.com/products/cli/#install)

The `npm` dependencies must be installed before running the application:

```sh
npm install
```
#### Run

Running both the UI and server components can be done using the `nx serve` command. Note that the cloud ID and API key for your Elastic cloud deployment is required to start the server, either by exporting environment variables or including your own .env file at the top of the project.

```sh
export ELASTIC_CLOUD_ID=my-elastic-deployment-cloud-id
export ELASTIC_API_KEY=my-api-key
netlify dev
```

The app is accessible via the web browser at `http://localhost:8888`.

### Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io).

### Resources

#### Development Resources

1. [React](https://reactjs.org)
2. [Elasticsearch Node.js/ JavaScript Client](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)

#### Academic Resources

For those interested in the original Fu-Finder game, and the inspiring game PageHunt, check out the below academic papers and resources.

1. [Fu-Finder: A Game for Studying Querying Behaviours](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=557f75dc9f1252639566822d9cb94496b2fc785a)
2. [Page Hunt: Improving Search Engines Using
Human Computation Games](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=cd51ccd0dd2dbb1065671ad1637ebd570ecab1eb)
3. [Internet Widgets- GWAP from Bing: Page Hunt](http://internetwidgets.blogspot.com/2009/11/gwap-from-bing-page-hunt.html)

#### IR Datasets

For Elastic-fu Finder, we used a subset of the [top 10 million websites](https://www.domcop.com/top-10-million-websites) as calculated via the [Open PageRank initiative](https://www.domcop.com/openpagerank/what-is-openpagerank). Open PageRank uses a couple of sources for it's website dataset, including [Common Crawl](https://commoncrawl.org/).