import { render, screen } from '@testing-library/react';

import Badges from './badges';
import { BadgesProps } from './badges';

describe('Badges', () => {
  it('should render successfully', async () => {
    const props: BadgesProps = {
    badges: [
      { name: 'Vector Search', type: 'KnnScoreDocQuery' as const, 
        bonusPoints: 10, isCollected: false 
      },
    ],
    isGameActive: false};
    const { baseElement } = render(<Badges {...props} />);
    expect(baseElement).toBeTruthy();

    const badgeImage = screen.getByTestId('badge-coin');
    expect(badgeImage).toBeDefined();
  });
});
