/* eslint-disable testing-library/prefer-screen-queries */
import { render, screen } from '@testing-library/react';

import ResultsMessage from './results-message';

describe('ResultsMessage', () => {

  beforeAll(() => {
    HTMLCanvasElement.prototype.getContext = jest.fn();
  })

  it('should show win message', async () => {
    const { baseElement } = render(<ResultsMessage hasFoundResults={true} hasSubmittedQuery={true}/>);
    expect(baseElement).toBeTruthy();

    const message = screen.getByTestId('results-message');
    expect(message.innerHTML).toContain('Win');
  });

  it('should show try again message', async () => {
    const { baseElement } = render(<ResultsMessage hasFoundResults={false} hasSubmittedQuery={true}/>);
    expect(baseElement).toBeTruthy();

    const message = screen.getByTestId('results-message');
    expect(message.innerHTML).toContain('Try again');
  });
});
