import express from 'express';
import Client from '@searchkit/api';
import 'cross-fetch/polyfill';

import cors from 'cors';

import { environment } from './environments/environment';

const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();

const options: cors.CorsOptions = {
  origin: environment.allowedOrigin,
};
app.use(cors(options));

app.use(express.json());

const client = Client({
  connection: {
    host: 'https://elastic-fu-finder.es.uksouth.azure.elastic-cloud.com:9243',
    apiKey: 'MY KEY', // TODO extract to secret
  },
  search_settings: {
    highlight_attributes: ['url', 'title', 'body_content'],
    search_attributes: ['url', 'title', 'body_content'],
    result_attributes: ['url', 'title', 'body_content'],
    facet_attributes: ['title'],
  },
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post('/api/search', async (req, res) => {
  try {
    const results = await client.handleRequest(req.body);
    res.send(results);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});