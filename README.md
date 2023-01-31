# Elastic-fu Finder

## Search Game for Teaching Search Using Elasticsearch

This project was generated using [Nx](https://nx.dev).

### Nx How-to

🔎 **Smart, Fast and Extensible Build System**

#### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

#### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

#### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@elastic-fu-finder/mylib`.

#### Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

#### Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

#### Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

#### Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

#### Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.



#### ☁ Nx Cloud

##### Distributed Computation Caching & Distributed Task Execution

Nx Cloud pairs with Nx in order to enable you to build and test code more rapidly, by up to 10 times. Even teams that are new to Nx can connect to Nx Cloud and start saving time instantly.

Teams using Nx gain the advantage of building full-stack applications with their preferred framework alongside Nx’s advanced code generation and project dependency graph, plus a unified experience for both frontend and backend developers.

Visit [Nx Cloud](https://nx.app/) to learn more.
### Resources

#### Academic Resources

For those interested in the original Fu-Finder game, and the inspiring game PageHunt, check out the below academic papers and resources.

1. [Fu-Finder: A Game for Studying Querying Behaviours](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=557f75dc9f1252639566822d9cb94496b2fc785a)
2. [Page Hunt: Improving Search Engines Using
Human Computation Games](https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=cd51ccd0dd2dbb1065671ad1637ebd570ecab1eb)
3. [Internet Widgets- GWAP from Bing: Page Hunt](http://internetwidgets.blogspot.com/2009/11/gwap-from-bing-page-hunt.html)

#### IR Datasets

For Elastic-fu Finder, we used a subset of the [top 10 million websites](https://www.domcop.com/top-10-million-websites) as calculated via the [Open PageRank initiative](https://www.domcop.com/openpagerank/what-is-openpagerank). Open PageRank uses a couple of sources for it's website dataset, including [Common Crawl](https://commoncrawl.org/).
