import { getDocumentByID } from '../util/elasticsearch';
import { convertRequest, generateResponse } from '../util/helper';

// Note: Netlify deploys this function at the endpoint /.netlify/functions/document
export async function handler(event: { body: { documentID: string | null; }; }, context: any) {
  const request = convertRequest(event.body);

  if (!request.documentID) { 
    return generateResponse(500, 'Document ID not specified');
  }

  try {
    const results = await getDocumentByID(request.documentID);
    
    return generateResponse(200, results);
  }
  catch(e) {
    console.log(e);
    
    return generateResponse(500, e);
  }
};
