import { render, screen } from '@testing-library/react';

import { End } from './end';
import { BrowserRouter } from 'react-router-dom';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/end",
    state: { badges: [{ name: 'Vector Search', type: 'KnnScoreDocQuery', 
      bonusPoints: 10, isCollected: false }], 
      points: 10}
  })
}));

describe('End', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<BrowserRouter><End/></BrowserRouter>);
    expect(baseElement).toBeTruthy();

    const gameOverTitle = await screen.getByTestId('game-over-message').innerHTML;
    expect(gameOverTitle).toBe('Game Over!');
  });
});
