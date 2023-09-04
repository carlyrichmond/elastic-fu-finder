import { convertRequest, generateResponse } from './helper';


describe('Helper', () => {
  it('should generate correct response', async () => {
    const statusCode = 200;
    const data = { element: 'my-value' };

    const response = generateResponse(statusCode, data);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual('{\"element\":\"my-value\"}');
  });

  it('should generate correct request', async () => {
    const data = '{\"documentID\":\"f987fhngmkr87xc\"}';

    const request = convertRequest(data);
    expect(request.documentID).toEqual('f987fhngmkr87xc');
  });
});
