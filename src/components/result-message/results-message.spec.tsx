/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';

import ResultsMessage from './results-message';

describe('ResultsMessage', () => {

  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn();
  });

  it('should show go message', async () => {
    const { baseElement } = render(<ResultsMessage resultsPosition={undefined} hasGameInitialized={false}/>);
    expect(baseElement).toBeTruthy();

    const message = screen.getByTestId('results-message');
    expect(message.innerHTML).toContain('Go');
  });

  it('should show win message', async () => {
    const { baseElement } = render(<ResultsMessage resultsPosition={1} hasGameInitialized={true}/>);
    expect(baseElement).toBeTruthy();

    const message = screen.getByTestId('results-message');
    expect(message.innerHTML).toContain('Win');
  });

  it('should show try again message', async () => {
    const { baseElement } = render(<ResultsMessage resultsPosition={-1} hasGameInitialized={true}/>);
    expect(baseElement).toBeTruthy();

    const message = screen.getByTestId('results-message');
    expect(message.innerHTML).toContain('Try again');
  });
});
