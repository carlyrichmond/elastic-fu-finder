import { render } from '@testing-library/react';
import ResultsCollection from './results-collection';

describe('ResultsList', () => {
  it('should render', async () => {
    const { baseElement } = render(
      <ResultsCollection
        correctResultId="192828ghfn33"
        updateScore={() => {
          return 10;
        } } 
        getNextPage={() => {
          return;
        } }        
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
