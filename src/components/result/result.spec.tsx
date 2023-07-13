import { render, screen, findByTestId } from '@testing-library/react';

import Result from './result';

describe('Result', () => {
  const resultProps = {
    hit: {
      _id: '039fjh3929dfj',
      _source: {
        title: 'My web page',
        meta_description: 'This is a not very interesting web page.',
      },
    },
    correctResultId: '039fjh3929dfj',
  };

  it('should render matching result successfully', () => {
    const { baseElement } = render(<Result {...resultProps} />);
    expect(baseElement).toBeTruthy();
  });
});
