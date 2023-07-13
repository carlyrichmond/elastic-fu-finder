export function generateResponse(statusCode: number, data: any) {
    return {
      statusCode: statusCode.toString(),
      headers: {
       /* Required for CORS support to work */
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
     body: JSON.stringify(data)
    };
  };
  
export function convertRequest(data: any) {
    return JSON.parse(data);
}