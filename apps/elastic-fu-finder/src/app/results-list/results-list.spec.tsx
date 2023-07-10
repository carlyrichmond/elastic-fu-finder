import { render } from '@testing-library/react';
import ResultsList from './results-list';

describe('ResultsList', () => {

  it('should render', () => {
    const { baseElement } = render(<ResultsList correctResultId="192828ghfn33" 
      updateScore={() => { return 10; } } />);
    expect(baseElement).toBeTruthy();
  });

});
