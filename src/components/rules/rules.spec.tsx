import { render } from '@testing-library/react';

import Rules from './rules';
import { BrowserRouter } from 'react-router-dom';

describe('Rules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Rules />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
