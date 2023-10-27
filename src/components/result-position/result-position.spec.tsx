import { render, screen } from '@testing-library/react';

import ResultPosition from './result-position';
import { ResultPositionProps } from './result-position';

describe('ResultPosition', () => {
  it('should render successfully', async () => {
    const props: ResultPositionProps = {
    position: 2 };
    
    const { baseElement } = render(<ResultPosition {...props} />);
    expect(baseElement).toBeTruthy();

    const resultPosition = screen.getByTestId('position');
    expect(resultPosition).toBeDefined();
    expect(resultPosition.innerHTML).toEqual("2");
  });

  it('should show icon when no result', async () => {
    const props: ResultPositionProps = {
    position: -1 };
    
    const { baseElement } = render(<ResultPosition {...props} />);
    expect(baseElement).toBeTruthy();

    const resultPosition = screen.getByTestId('no-result-returned-indicator');
    expect(resultPosition).toBeDefined();
  });
});
