import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Game from './game';

jest.mock('axios');

describe('Game', () => {
  it('should render successfully', async () => {
    const { baseElement } = render(<BrowserRouter><Game /></BrowserRouter>);
    expect(baseElement).toBeTruthy();

    // should get ids on initialisation
    expect(axios.get).toHaveBeenCalledWith('.netlify/functions/ids');
  });
});
