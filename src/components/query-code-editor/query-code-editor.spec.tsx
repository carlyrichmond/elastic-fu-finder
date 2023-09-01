import { render } from '@testing-library/react';
import QueryCodeEditor from './query-code-editor';

describe('QueryCodeEditor', () => {
  it('should render', async () => {

    const getResults = () => {
      return;
    }

    const { baseElement } = render(
      <QueryCodeEditor getResults={getResults}/>
    );
    expect(baseElement).toBeTruthy();
  });
});
