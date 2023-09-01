/* eslint-disable testing-library/prefer-screen-queries */
import { render, findByTestId } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';

import Timer from './timer';

describe('Timer', () => {
  it('should render successfully', async () => {
    const props = { gameTimeInMinutes: 0, badges: [], points: 0 }
    const { baseElement } = render(<BrowserRouter><Timer { ...props }/></BrowserRouter>);
    expect(baseElement).toBeTruthy();
  });

  it('should count down', async () => {
    const props = { gameTimeInMinutes: 3, badges: [], points: 0 }
    const { baseElement } = render(<BrowserRouter><Timer { ...props }/></BrowserRouter>);
    expect((await findByTestId(baseElement, /timer/)).innerHTML).toContain(
      '3:0'
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    expect((await findByTestId(baseElement, /timer/)).innerHTML).toContain('2:5');
  });

  it('should show FIN on time up', async () => {
    const props = { gameTimeInMinutes: 0, badges: [], points: 0 }
    const { baseElement } = render(<BrowserRouter><Timer { ...props }/></BrowserRouter>);
    expect((await findByTestId(baseElement, /timer/)).innerHTML).toContain('0:00');

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    expect((await findByTestId(baseElement, /timer/)).innerHTML).toContain('FIN');
  });
});
