import { render } from '@testing-library/react';

import Score from './score';
import { ScoreProps } from './score';

describe('Score', () => {
  it('should render successfully', () => {
    const props: ScoreProps = { score: 10 };
    const { baseElement } = render(<Score {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
