import express from 'express';
import Client from '@searchkit/api';

import cors from 'cors';

import { environment } from './environments/environment';

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

const options: cors.CorsOptions = {
  origin: environment.allowedOrigin
};
app.use(cors(options));

const client = Client({
  connection: {
    host: 'https://elastic-fu-finder.es.uksouth.azure.elastic-cloud.com/9243',
    apiKey: 'MY KEY', // TODO extract to secret
  },
  search_settings: {
    highlight_attributes: ['url', 'title', 'body_content'],
    search_attributes: ['url', 'title', 'body_content'],
    result_attributes: ['url', 'title', 'body_content'],
    facet_attributes: ['title']
  },
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.post('/api/search', async (req, res) => {
  console.log(req.body);
  const results = await client.handleRequest(req.body);
  res.send(results);
});

app.listen(port, () => {
  console.log(`[ ready ] http://localhost:${port}`);
});
