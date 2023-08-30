import { render } from '@testing-library/react';

import Result from './result';
import { Source } from '../../util/elasticsearch';

describe('Result', () => {
  const resultSource: Source = {
    title: 'My web page',
    meta_description: 'This is a not very interesting web page.',
  };
  const resultProps = {
    hit: {
      _id: '039fjh3929dfj',
      _source: resultSource,
    },
    correctResultId: '039fjh3929dfj',
  };

  it('should render matching result successfully', () => {
    const { baseElement } = render(<Result {...resultProps} />);
    expect(baseElement).toBeTruthy();
  });
});
