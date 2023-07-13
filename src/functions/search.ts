import { getSearchResults } from '../util/elasticsearch';
import { convertRequest, failureCode, generateResponse, okCode } from '../util/helper';

// Note: Netlify deploys this function at the endpoint /.netlify/functions/search
export async function handler(event: { body: { queryString: string}; }, context: any) {
  const request = convertRequest(event.body);

  if (!request.queryString) { 
    return generateResponse(failureCode, 'Query not specified');
  }

  try {
    const results = await getSearchResults(request.queryString);

    return generateResponse(okCode, results)
  }
  catch(e) {
    console.log(e);
    
    return generateResponse(failureCode, e);
  }
};
