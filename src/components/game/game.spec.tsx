import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Game from './game';
describe('Game', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<BrowserRouter><Game /></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });
});
