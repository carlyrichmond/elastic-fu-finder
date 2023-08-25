import { render, screen } from '@testing-library/react';

import Badges from './badges';
import { BadgesProps } from './badges';

describe('Badges', () => {
  it('should render successfully', () => {
    const props: BadgesProps = {
    badges: [
      { name: 'Vector Search', imagePath: 'vector-badge.png', 
        bonusPoints: 10, isCollected: false 
      }
    ]};
    const { baseElement } = render(<Badges {...props} />);
    expect(baseElement).toBeTruthy();

    const badgeImage = screen.getByTestId('badge-img');
    expect(badgeImage).toBeDefined();
  });
});
