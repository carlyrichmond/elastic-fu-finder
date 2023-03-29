import { render, findByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Timer from './timer';

describe('Timer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Timer />);
    expect(baseElement).toBeTruthy();
  });

  it('should count down', async () => {
    const { baseElement } = render(<Timer />);
    expect((await findByTestId(baseElement, /timer/)).innerHTML).toContain('3:0');

    await act(async () => { 
      await new Promise(resolve => setTimeout(resolve, 2000)) 
    });

    expect((await findByTestId(baseElement, /timer/)).innerHTML).toContain('2:5');
  });
});