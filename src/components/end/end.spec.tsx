import { render, screen } from '@testing-library/react';

import { End } from './end';
import { BrowserRouter } from 'react-router-dom';

describe('End', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<BrowserRouter><End/></BrowserRouter>);
    expect(baseElement).toBeTruthy();

    const gameOverTitle = await screen.getByTestId('game-over-message').innerHTML;
    expect(gameOverTitle).toBe('Game Over!');
  });
});
