import { render } from '@testing-library/react';
import ResultsCollection from './results-collection';
import { Badge } from '../badges/badges';

describe('ResultsList', () => {
  it('should render', () => {
    const badges = new Set<Badge>();
    const { baseElement } = render(
      <ResultsCollection
        badges={badges}
        correctResultId="192828ghfn33"
        updateScore={() => {
          return 10;
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
