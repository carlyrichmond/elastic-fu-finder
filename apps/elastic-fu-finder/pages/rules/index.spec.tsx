import { render } from '@testing-library/react';

import Rules from './index';

describe('Rules', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Rules />);
    expect(baseElement).toBeTruthy();
  });
});
