import { getAllDocumentIDs } from '../util/elasticsearch';
import { failureCode, generateResponse, okCode } from '../util/helper';

// Note: Netlify deploys this function at the endpoint /.netlify/functions/ids
export async function handler(event: any, context: any) {
  try {
    const results = await getAllDocumentIDs();

    return generateResponse(okCode, results)
  }
  catch(e) {
    console.log(e);
    
    return generateResponse(failureCode, e)
  }
};
