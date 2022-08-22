import { render, fireEvent, findByTestId, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';
import Nav from '../Nav';
import axios from 'axios';

let navbar;

beforeEach(() => {
  navbar = render(
    <Provider store={createStore(rootReducer)}>
      <Nav />
    </Provider>
  );
});

afterEach(() => {
  navbar = null;
});

describe('Tests for the Navbar component', () => {

  test('Should render Navbar', () => {
    expect(navbar.getByTestId('navbar')).toBeInTheDocument();
  });

  test('Navbar should have input field', () => {
    expect(navbar.getByTestId('searchbar-input')).toBeInTheDocument();
  });

  test('Input field should display typed text', () => {
    const input = navbar.getByTestId('searchbar-input');
    fireEvent.change(input, { target: { value: 'bitcoin' } });
    expect(input.value).toBe('bitcoin');
  });

  test('Should display search result list from an axios api call', async () => {
    const input = navbar.getByTestId('searchbar-input');
    fireEvent.change(input, { target: { value: 'bitcoin' } });
    // await waitFor(() => navbar.findByTestId('searchbar-results'));
    const coinList = await navbar.findByTestId('searchbar-results');
    expect(coinList).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/search?query=bitcoin')
  });

});