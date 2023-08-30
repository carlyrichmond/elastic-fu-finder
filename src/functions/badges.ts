import { getBadges } from '../util/elasticsearch';
import { generateResponse } from '../util/helper';

// Note: Netlify deploys this function at the endpoint /.netlify/functions/document
export async function handler(event: any, context: any) {
  try {
    const results = await getBadges();
    
    return generateResponse(200, results);
  }
  catch(e) {
    console.log(e);
    
    return generateResponse(500, e);
  }
};
