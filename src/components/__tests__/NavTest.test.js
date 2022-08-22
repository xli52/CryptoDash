import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../redux/reducers';
import Nav from '../Nav';

describe('Tests for the Navbar component', () => {

  test('Should render Navbar', () => {
    const navbar = render(<Nav />);
    expect(navbar.getByTestId('navbar')).toBeInTheDocument();
  });

  test('Navbar should have input field', () => {
    const navbar = render(<Nav />);
    expect(navbar.getByTestId('searchbar-input')).toBeInTheDocument();
  });

});

describe('Tests for the input field', () => {

  test('Input field should display typed text', () => {
    const navbar = render(
      <Provider store={createStore(rootReducer)}>
        <Nav />
      </Provider>
    );
    const input = navbar.getByTestId('searchbar-input');
    fireEvent.change(input, { target: { value: 'bitcoin' } });
    expect(input.value).toBe('bitcoin');
  });

  test('Axios get should have been called when input value changed', () => {

  });

});