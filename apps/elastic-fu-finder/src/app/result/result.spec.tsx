import { render } from '@testing-library/react';

import Result from './result';

describe('Result', () => {

  const resultProps = { hit: {
    objectID: '039fjh3929dfj'
  }};

  it('should render successfully', () => {
    const { baseElement } = render(<Result {...resultProps}/>);
    expect(baseElement).toBeTruthy();
  });
});
