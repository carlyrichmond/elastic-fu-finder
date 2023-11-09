import { Client } from '@elastic/elasticsearch';

const index = 'search-elastic-fu-finder-pages';
const vectorSearchIndex = 'vector-search-elastic-fu-finder-pages';
const index_size = 101;

const userQueryIndex = 'user-queries';
const bonusBadgeIndex = 'badge-bonuses';

const cloudID = process.env.ELASTIC_CLOUD_ID || '';
const apiKey = process.env.ELASTIC_API_KEY || '';

const client = new Client({
    cloud: { id: cloudID },
    auth: { apiKey: apiKey },
});

export type ElasticQueryType = 'TermQuery' | 'BooleanQuery' | 'WildcardQuery' | 'PhraseQuery' 
| 'PrefixQuery' | 'MultiPhraseQuery' | 'FuzzyQuery' | 'RegexpQuery' | 'TermRangeQuery' 
| 'ConstantScoreQuery'| 'DisjunctionMaxQuery' | 'MatchAllDocsQuery' | 'KnnScoreDocQuery' | 'ESQLQuery';

export interface DocumentResult<T> {
  _id: string;
  _source: T;
}

export interface Source {
  title: string;
  meta_description: string;
}

export interface BadgeSource {
  name: string;
  type: ElasticQueryType;
  points: number;
}

export interface ElasticsearchResult<T> {
  hits: { hits: DocumentResult<T>[] };
  profile?: ElasticProfileResults;
}

export interface ElasticProfileResults {
  shards: ElasticProfileResult[];
}

export interface ElasticProfileResult {
  searches: ElasticQueryProfile[];
}

export interface ElasticQueryProfile {
  query: { type: ElasticQueryType }[]
}

export interface ElasticsearchMultiSearchResult<T> {
  responses: Array<ElasticsearchResult<T>>;
}

export function getDocumentByID(documentID: string): Promise<any> {
    return client.search({
        index: index,
        query: {
          ids: {
            values: documentID,
          },
        },
    });
}

export async function getAllDocumentIDs() {
    return client.search({
        index: index,
        _source: ['_id'],
        query: {
          match_all: {},
        },
        size: index_size,
    });
}

export async function getSearchResults(query: any) {
  const keyword = query.query;
  const vector = query.knn;

  return client.search({
    index: vectorSearchIndex,
    profile: true,
    query: keyword,
    knn: vector
  });
}

export async function indexGameSearch( documentID: string, searchTerms: any ) {
  let document = { 
    document_id: documentID, 
    query: searchTerms.query, 
    knn: searchTerms.knn };

  return client.index({
    index: userQueryIndex,
    document: document
  });
}

export async function getBadges() {
  return client.search({
    index: bonusBadgeIndex,
    query: {
      match_all: {}
    }
  });
}