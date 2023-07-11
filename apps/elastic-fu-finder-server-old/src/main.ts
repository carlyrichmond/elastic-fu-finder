import express from 'express';
import { Client } from '@elastic/elasticsearch';

import cors from 'cors';

import { environment } from './environments/environment';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

const options: cors.CorsOptions = {
  origin: environment.allowedOrigin,
};
app.use(cors(options));

app.use(express.json());

const client = new Client({
  cloud: { id: process.env.ELASTIC_CLOUD_ID },
  auth: { apiKey: process.env.ELASTIC_API_KEY },
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post('/api/document', async (req, res) => {
  const documentID = req.body.documentID;

  try {
    const results = await client.search({
      index: 'search-elastic-fu-finder-pages',
      query: {
        ids: {
          values: documentID,
        },
      },
    });
    res.send(results);
  } catch (e) {
    res.status(500).send({ message: 'Unable to obtain document details' });
  }
});

app.get('/api/ids', async (req, res) => {
  const index_size = 101;
  try {
    const results = await client.search({
      index: 'search-elastic-fu-finder-pages',
      _source: ['_id'],
      query: {
        match_all: {},
      },
      size: index_size,
    });
    res.send(results);
  } catch (e) {
    res.status(500).send({ message: 'Unable to obtain ids' });
  }
});

app.post('/api/search', async (req, res) => {
  const query = req.body.queryString;

  if (!query) {
    res.send([]);
    return;
  }

  try {
    const results = await client.search({
      index: 'search-elastic-fu-finder-pages',
      query: {
        multi_match: {
          query: query,
          fields: ['url', 'title', 'body_content'],
        },
      },
    });
    res.send(results);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
