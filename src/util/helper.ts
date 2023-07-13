export const okCode = "200";
export const failureCode = "500";

export function generateResponse(statusCode: string, data: any) {
    return {
      statusCode: statusCode,
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