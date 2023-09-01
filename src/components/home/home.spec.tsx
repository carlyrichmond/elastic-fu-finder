import { render } from '@testing-library/react';

import Home from './home';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
