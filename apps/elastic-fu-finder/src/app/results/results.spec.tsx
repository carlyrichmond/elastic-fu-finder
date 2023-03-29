import { findAllByTestId, render } from '@testing-library/react';
import { Hit, Results } from './results';

describe('Results', () => {

  const testHits: Hit[] = [
    { objectID: '8fh4bf56', title: 'My Awesome Blog', url: 'https://www.myawesomeblog.com'},
    { objectID: '2fr0vbfb8', title: 'Elastic', url: 'https://www.elastic.co'}
  ];

  it('should render successfully', async () => {
    const { baseElement } = render(<Results hits={testHits}/>);
    expect(baseElement).toBeTruthy();

    expect((await findAllByTestId(baseElement, /result-element/)).length).toEqual(testHits.length);
  });
});
