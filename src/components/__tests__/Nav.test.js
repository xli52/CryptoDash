import Nav from "../Nav";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from '../../redux/reducers';
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";

const store = createStore(rootReducer, {});

const Wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

describe.skip("Nav", () => {
  test("Should render Nav", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        coins: [
          {
            id: "bitcoin",
            name: "Bitcoin",
            symbol: "BTC",
            market_cap_rank: 1,
            thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
            large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          }
        ]
      }
    });
    const navComponent = render(<Nav />, { wrapper: Wrapper });

    expect(screen.getByTestId("navbar")).toBeInTheDocument();

    const input = navComponent.getByPlaceholderText("Search here...");
    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'bitcoin' } });
    expect(input.value).toBe('bitcoin')

    const coinList = await screen.findByTestId("searchbar-results")
    expect(coinList).toBeInTheDocument()

    expect(axios.get).toHaveBeenCalledTimes(1);
  })
})