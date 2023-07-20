import { render } from '@testing-library/react';
import ResultsList from './results-list';
import { DocumentResult } from '../result/result';

describe('ResultsList', () => {
  it('should render', () => {
    const results: DocumentResult[] = [];
    const { baseElement } = render(
      <ResultsList
        correctResultId='192828ghfn33'
        resultsType='Vector'
        results={results}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
