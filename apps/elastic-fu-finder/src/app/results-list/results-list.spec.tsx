import { render } from '@testing-library/react';

import ResultsList from './results-list';

describe('ResultsList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ResultsList />);
    expect(baseElement).toBeTruthy();
  });
});
