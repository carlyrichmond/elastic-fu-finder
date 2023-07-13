export function generateResponse(statusCode: number, data: any) {
    return {
      statusCode: JSON.stringify(statusCode),
      body: JSON.stringify(data)
    };
  };
  
export function convertRequest(data: any) {
    return JSON.parse(data);
}