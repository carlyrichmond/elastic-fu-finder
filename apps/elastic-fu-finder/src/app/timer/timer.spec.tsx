import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Timer from './timer';

describe('Timer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Timer />);
    expect(baseElement).toBeTruthy();
  });

  it('should count down', async () => {
    const { baseElement } = render(<Timer />);
    expect(baseElement.innerHTML).toContain('3:0');

    await act(async () => { await new Promise(resolve => setTimeout(resolve, 2000)) });

    expect(baseElement.innerHTML).toContain('2:5');
  });
});