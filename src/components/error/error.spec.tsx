import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Error from './error';

describe('Error', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Error />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
