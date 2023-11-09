import { indexGameSearch } from '../util/elasticsearch';
import { convertRequest, generateResponse } from '../util/helper';

// Note: Netlify deploys this function at the endpoint /.netlify/functions/index-search
export async function handler(event: { body: { documentID: string, queryString: string}; }, context: any) {
  const request = convertRequest(event.body);

  if (!request.queryString) { 
    return generateResponse(500, 'Query not specified');
  }

  try {
    await indexGameSearch(request.documentID, request.queryString);

    return generateResponse(200, {})
  }
  catch(e) {
    console.log(e);
    
    return generateResponse(500, e);
  }
};
