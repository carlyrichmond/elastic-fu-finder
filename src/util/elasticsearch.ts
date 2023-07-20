import { Client } from "@elastic/elasticsearch";

const index = 'search-elastic-fu-finder-pages';
const vectorSearchIndex = 'vector-search-elastic-fu-finder-pages';
const index_size = 101;

const cloudID = process.env.ELASTIC_CLOUD_ID || '';
const apiKey = process.env.ELASTIC_API_KEY || '';

const client = new Client({
    cloud: { id: cloudID },
    auth: { apiKey: apiKey },
});

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

export function getAllDocumentIDs(): Promise<any> {
    return client.search({
        index: index,
        _source: ['_id'],
        query: {
          match_all: {},
        },
        size: index_size,
    });
}

export function getSearchResults(query: string): Promise<any> {
  return client.msearch({
    searches: [
      { index: index },
      { query: { multi_match: { query, fields: ['url', 'title', 'body_content'] } } },
      { index: vectorSearchIndex },
      { knn: 
        {
          field: "text_embedding.predicted_value",
          k: 10,
          num_candidates: 101,
          query_vector_builder: {
          text_embedding: {
            model_text: "angelina",
            model_id: "sentence-transformers__msmarco-minilm-l-12-v3" 
            }
          }
        }
      }
    ]
  });
}