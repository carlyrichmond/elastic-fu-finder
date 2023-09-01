import { render, screen } from '@testing-library/react';

import { BadgeCoin } from './badge-coin';
import { BadgeCoinProps } from './badge-coin';

describe('Badges', () => {
  it('should render successfully', async () => {
    const props: BadgeCoinProps = {
    badge: 
      { name: 'Vector Search', type: 'KnnScoreDocQuery', 
        bonusPoints: 10, isCollected: false 
      }};
    const { baseElement } = render(<BadgeCoin {...props} />);
    expect(baseElement).toBeTruthy();

    const badgeImage = screen.getByTestId('badge-coin');
    expect(badgeImage).toBeDefined();
  });
});
