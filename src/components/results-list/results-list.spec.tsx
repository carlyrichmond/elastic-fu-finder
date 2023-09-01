import { render } from '@testing-library/react';
import ResultsList from './results-list';
import { DocumentResult, Source } from '../../util/elasticsearch';

describe('ResultsList', () => {
  it('should render', async () => {
    const results: DocumentResult<Source>[] = [];
    const { baseElement } = render(
      <ResultsList
        correctResultId='192828ghfn33'
        results={results}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
